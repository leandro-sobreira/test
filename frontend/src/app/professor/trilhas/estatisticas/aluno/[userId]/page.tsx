'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import AlunoStatsView from '@/components/StatsView/AlunoStatsView';
import api from '@/config/api';
import { getTrackUsersSummaryService } from '@/services/tracks';

interface AlgorithmStats {
  track_name: string;
  algorithm_title: string;
  total_attempts: number;
  correct_attempts: number;
  incorrect_attempts: number;
  error_attempts: number;
  notAnswered: number;
}

interface Attempt {
  exerciseId: string;
  correct: boolean;
}

interface AlunoData {
  user_name: string;
  total_attempts: number;
  error_attempts: number;
  incorrect_attempts: number;
  algorithms: AlgorithmStats[];
  total_exercises: number;
  correct_exercises: number;
  incorrect_exercises: number;
  attempts: Attempt[];
}

interface AlunoStatsViewProps {
  aluno: AlunoData;
  chartRef: React.MutableRefObject<any>;
  enrolledTracks?: any[]; // corrigido para não exigir explicitamente a prop
}

export default function ViewStudentStatsPage() {
  const params = useParams();
  const userIdParam = params.userId;
  const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;

  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<AlunoData | null>(null);

  const pdfRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      setLoading(true);
      let trackId = 1;

      const algorithmsMap: Record<string, AlgorithmStats> = {};
      const attemptsList: Attempt[] = [];

      let statsBase = {
        user_name: '',
        total_attempts: 0,
        error_attempts: 0,
        incorrect_attempts: 0,
        notAnswered: true,
      };

      const allTracks = (await api.get('/tracks'))?.data?.data || [];
      const totalTracks = allTracks.length;

      while (trackId <= totalTracks) {
        try {
          const response = await getTrackUsersSummaryService(trackId);
          const studentView = response?.data?.data?.studentView ?? {};
          const algorithmView = response?.data?.data?.algorithmView ?? {};
          const studentStats = studentView[userId];

          if (!studentStats) {
            trackId++;
            continue;
          }

          statsBase.user_name = studentStats.user_name;
          statsBase.total_attempts += studentStats.total_attempts || 0;
          statsBase.error_attempts += studentStats.error_attempts || 0;
          statsBase.incorrect_attempts += studentStats.incorrect_attempts || 0;
          if (!studentStats.notAnswered) {
            statsBase.notAnswered = false;
          }

          Object.values(algorithmView).forEach((alg: any) => {
            const trackName = allTracks[trackId - 1]?.title || '';
            const algorithmKey = `${trackId}-${alg.algorithm_title}`;

            const studentEntry = (alg.students ?? []).find(
              (s: any) => s.user_id === parseInt(userId)
            );

            if (!algorithmsMap[algorithmKey]) {
              algorithmsMap[algorithmKey] = {
                track_name: trackName,
                algorithm_title: alg.algorithm_title,
                total_attempts: 0,
                correct_attempts: 0,
                incorrect_attempts: 0,
                error_attempts: 0,
                notAnswered: 1,
              };
            }

            if (studentEntry && studentEntry.total_attempts > 0) {
              algorithmsMap[algorithmKey].total_attempts += studentEntry.correct_attempts + studentEntry.incorrect_attempts + studentEntry.error_attempts;
              algorithmsMap[algorithmKey].correct_attempts += studentEntry.correct_attempts;
              algorithmsMap[algorithmKey].incorrect_attempts += studentEntry.incorrect_attempts;
              algorithmsMap[algorithmKey].error_attempts += studentEntry.error_attempts;
              algorithmsMap[algorithmKey].notAnswered = studentEntry.notAnswered || 0;

              if (Array.isArray(studentEntry.attempts)) {
                studentEntry.attempts.forEach((att: any) => {
                  attemptsList.push({
                    exerciseId: att.exercise_id?.toString() || '',
                    correct: att.correct === true,
                  });
                });
              }
            }
          });
        } catch (err) {
          console.warn(`Erro na trilha ${trackId}:`, err);
          break;
        }
        trackId++;
      }

      const algorithms = Object.values(algorithmsMap);

      if (statsBase.total_attempts > 0 || !statsBase.notAnswered) {
        setStudentData({
          ...statsBase,
          algorithms,
          total_exercises: algorithms.filter(a => a.notAnswered !== 1).length,
          correct_exercises: algorithms.filter(a => a.correct_attempts > 0).length,
          incorrect_exercises: algorithms.filter(a => a.correct_attempts === 0 && a.notAnswered !== 1).length,
          attempts: attemptsList,
        });
      } else {
        setStudentData(null);
      }

      setLoading(false);
    }

    fetchData();
  }, [userId]);

  function handleExportPDF() {
    if (!studentData) return;

    const doc = new jsPDF();
    const dataCriacao = new Date().toLocaleDateString();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text(
      `Relatório de Desempenho do Aluno: ${studentData.user_name}`,
      14,
      20,
      { align: 'left' }
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    let y = 30;

    autoTable(doc, {
      startY: y,
      head: [['Campo', 'Valor']],
      body: [
        ['Total de exercícios resolvidos', `${studentData.total_exercises}`],
        ['Exercícios submetidos - aprovados no teste', `${studentData.correct_exercises}`],
        ['Exercícios submetidos - reprovados no teste', `${studentData.incorrect_exercises}`],
        ['Exercícios submetidos com erro de execução', `${studentData.error_attempts}`],
        ['Total de Submissões', `${studentData.correct_exercises + studentData.incorrect_exercises + studentData.error_attempts}`],
      ],
      theme: 'grid',
      styles: { fontSize: 11, font: 'helvetica' },
      headStyles: { fillColor: [52, 152, 219] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 100 },
      }
    });
    y = (doc as any).lastAutoTable.finalY + 10;

    setTimeout(() => {
      const chartCanvas = chartRef.current?.canvas || chartRef.current?.ctx?.canvas;
      if (chartCanvas) {
        const chartImg = chartCanvas.toDataURL('image/png', 1.0);
        doc.addImage(chartImg, 'PNG', 20, y, 170, 60);
        y += 75;
      }

      const trilhas: Record<string, AlgorithmStats[]> = {};
      for (const alg of studentData.algorithms) {
        if (!trilhas[alg.track_name]) trilhas[alg.track_name] = [];
        trilhas[alg.track_name].push(alg);
      }

      Object.entries(trilhas).forEach(([trilha, algoritmos]) => {
        autoTable(doc, {
          startY: y + 4,
          head: [[
            {
              content: `Nome da trilha: ${trilha}`,
              styles: {
                halign: 'center',
                fontStyle: 'bold',
                font: 'helvetica',
                fillColor: [0, 0, 0],
                textColor: [255, 255, 255],
              }
            }
          ]],
          body: [],
          theme: 'plain',
          styles: { font: 'helvetica', fontSize: 12 }
        });

        autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY,
          head: [[
            { content: 'Exercício', styles: { halign: 'center', font: 'helvetica' } },
            { content: 'Submissões Totais', styles: { halign: 'center', font: 'helvetica' } },
            { content: 'Submissões Aprovadas', styles: { halign: 'center', font: 'helvetica' } },
            { content: 'Reprovações', styles: { halign: 'center', font: 'helvetica' } },
            { content: 'Erros de Execução', styles: { halign: 'center', font: 'helvetica' } },
            { content: 'Situação', styles: { halign: 'center', font: 'helvetica' } }
          ]],
          body: algoritmos.map((alg) => {
            let situacao = '';
            let fillColor: [number, number, number] | undefined = undefined;

            if (alg.correct_attempts > 0) {
              situacao = 'Correto';
              fillColor = [180, 238, 180];
            } else if (alg.total_attempts > 0) {
              situacao = 'Incorreto';
              fillColor = [255, 180, 180];
            } else {
              situacao = 'Nenhum envio';
              fillColor = [255, 245, 157];
            }

            return [
              alg.algorithm_title,
              { content: alg.total_attempts, styles: { halign: 'center', font: 'helvetica' } },
              { content: alg.correct_attempts, styles: { halign: 'center', font: 'helvetica' } },
              { content: alg.incorrect_attempts, styles: { halign: 'center', font: 'helvetica' } },
              { content: alg.error_attempts, styles: { halign: 'center', font: 'helvetica' } },
              {
                content: situacao,
                styles: {
                  halign: 'center',
                  font: 'helvetica',
                  fillColor,
                  textColor: [60, 60, 60]
                }
              }
            ];
          }),
          theme: 'grid',
          headStyles: { fillColor: [220, 230, 241], font: 'helvetica' },
          styles: { fontSize: 8, font: 'helvetica' },
          columnStyles: {
            0: { cellWidth: 23 },
            1: { cellWidth: 35 },
            2: { cellWidth: 35 },
            3: { cellWidth: 35 },
            4: { cellWidth: 35 },
            5: { cellWidth: 'auto' },
          }
        });
        y = (doc as any).lastAutoTable.finalY + 4;
      });

      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `${dataCriacao}`,
          14,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'left' }
        );
        doc.text(
          `${i}/${pageCount}`,
          doc.internal.pageSize.getWidth() - 14,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'right' }
        );
      }

      doc.save(`relatorio-${studentData.user_name.replaceAll(' ', '_')}.pdf`);
    }, 500);
  }

  return (
    <div className="flex flex-1 flex-col w-full gap-4 p-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Exportar como PDF
        </button>
      </div>

      <div ref={pdfRef} className="rounded-xl shadow-xl bg-white p-4">
        {loading ? (
          <p>Carregando dados...</p>
        ) : studentData ? (
          <AlunoStatsView aluno={studentData} chartRef={chartRef} enrolledTracks={[]} />
        ) : (
          <p>Nenhum dado encontrado para o aluno.</p>
        )}
      </div>
    </div>
  );
}
