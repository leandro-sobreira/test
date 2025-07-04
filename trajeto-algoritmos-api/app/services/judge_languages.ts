export enum LanguageId {
  JavaScript_Node_12_14_0 = 63,
  Assembly_NASM_2_14_02 = 45,
  Bash_5_0_0 = 46,
  Basic_FBC_1_07_1 = 47,
  C_Clang_7_0_1 = 75,
  CPP_Clang_7_0_1 = 76,
  C_GCC_7_4_0 = 48,
  CPP_GCC_7_4_0 = 52,
  C_GCC_8_3_0 = 49,
  CPP_GCC_8_3_0 = 53,
  C_GCC_9_2_0 = 50,
  CPP_GCC_9_2_0 = 54,
  Clojure_1_10_1 = 86,
  CSharp_Mono_6_6_0_161 = 51,
  COBOL_GnuCOBOL_2_2 = 77,
  Common_Lisp_SBCL_2_0_0 = 55,
  D_DMD_2_089_1 = 56,
  Elixir_1_9_4 = 57,
  Erlang_OTP_22_2 = 58,
  Executable = 44,
  FSharp_DOTNET_Core_SDK_3_1_202 = 87,
  Fortran_GFortran_9_2_0 = 59,
  Go_1_13_5 = 60,
  Groovy_3_0_3 = 88,
  Haskell_GHC_8_8_1 = 61,
  Java_OpenJDK_13_0_1 = 62,
  Kotlin_1_3_70 = 78,
  Lua_5_3_5 = 64,
  ObjectiveC_Clang_7_0_1 = 79,
  OCaml_4_09_0 = 65,
  Octave_5_1_0 = 66,
  Pascal_FPC_3_0_4 = 67,
  Perl_5_28_1 = 85,
  PHP_7_4_1 = 68,
  Plain_Text = 43,
  Prolog_GNU_Prolog_1_4_5 = 69,
  Python_2_7_17 = 70,
  Python_3_8_1 = 71,
  R_4_0_0 = 80,
  Ruby_2_7_0 = 72,
  Rust_1_40_0 = 73,
  Scala_2_13_2 = 81,
  SQL_SQLite_3_27_2 = 82,
  Swift_5_2_3 = 83,
  TypeScript_3_7_4 = 74,
  Visual_Basic_Net_vbnc_0_0_0_5943 = 84,
}

export type LanguageOption = {
  id: LanguageId
  name: string
  label: string
  value: string
}

export const languageOptions: LanguageOption[] = [
  {
    id: LanguageId.JavaScript_Node_12_14_0,
    name: 'JavaScript (Node.js 12.14.0)',
    label: 'JavaScript (Node.js 12.14.0)',
    value: 'javascript',
  },
  {
    id: LanguageId.Assembly_NASM_2_14_02,
    name: 'Assembly (NASM 2.14.02)',
    label: 'Assembly (NASM 2.14.02)',
    value: 'assembly',
  },
  { id: LanguageId.Bash_5_0_0, name: 'Bash (5.0.0)', label: 'Bash (5.0.0)', value: 'bash' },
  {
    id: LanguageId.Basic_FBC_1_07_1,
    name: 'Basic (FBC 1.07.1)',
    label: 'Basic (FBC 1.07.1)',
    value: 'basic',
  },
  { id: LanguageId.C_Clang_7_0_1, name: 'C (Clang 7.0.1)', label: 'C (Clang 7.0.1)', value: 'c' },
  {
    id: LanguageId.CPP_Clang_7_0_1,
    name: 'C++ (Clang 7.0.1)',
    label: 'C++ (Clang 7.0.1)',
    value: 'cpp',
  },
  { id: LanguageId.C_GCC_7_4_0, name: 'C (GCC 7.4.0)', label: 'C (GCC 7.4.0)', value: 'c' },
  { id: LanguageId.CPP_GCC_7_4_0, name: 'C++ (GCC 7.4.0)', label: 'C++ (GCC 7.4.0)', value: 'cpp' },
  { id: LanguageId.C_GCC_8_3_0, name: 'C (GCC 8.3.0)', label: 'C (GCC 8.3.0)', value: 'c' },
  { id: LanguageId.CPP_GCC_8_3_0, name: 'C++ (GCC 8.3.0)', label: 'C++ (GCC 8.3.0)', value: 'cpp' },
  { id: LanguageId.C_GCC_9_2_0, name: 'C (GCC 9.2.0)', label: 'C (GCC 9.2.0)', value: 'c' },
  { id: LanguageId.CPP_GCC_9_2_0, name: 'C++ (GCC 9.2.0)', label: 'C++ (GCC 9.2.0)', value: 'cpp' },
  {
    id: LanguageId.Clojure_1_10_1,
    name: 'Clojure (1.10.1)',
    label: 'Clojure (1.10.1)',
    value: 'clojure',
  },
  {
    id: LanguageId.CSharp_Mono_6_6_0_161,
    name: 'C# (Mono 6.6.0.161)',
    label: 'C# (Mono 6.6.0.161)',
    value: 'csharp',
  },
  {
    id: LanguageId.COBOL_GnuCOBOL_2_2,
    name: 'COBOL (GnuCOBOL 2.2)',
    label: 'COBOL (GnuCOBOL 2.2)',
    value: 'cobol',
  },
  {
    id: LanguageId.Common_Lisp_SBCL_2_0_0,
    name: 'Common Lisp (SBCL 2.0.0)',
    label: 'Common Lisp (SBCL 2.0.0)',
    value: 'lisp',
  },
  { id: LanguageId.D_DMD_2_089_1, name: 'D (DMD 2.089.1)', label: 'D (DMD 2.089.1)', value: 'd' },
  { id: LanguageId.Elixir_1_9_4, name: 'Elixir (1.9.4)', label: 'Elixir (1.9.4)', value: 'elixir' },
  {
    id: LanguageId.Erlang_OTP_22_2,
    name: 'Erlang (OTP 22.2)',
    label: 'Erlang (OTP 22.2)',
    value: 'erlang',
  },
  { id: LanguageId.Executable, name: 'Executable', label: 'Executable', value: 'exe' },
  {
    id: LanguageId.FSharp_DOTNET_Core_SDK_3_1_202,
    name: 'F# (.NET Core SDK 3.1.202)',
    label: 'F# (.NET Core SDK 3.1.202)',
    value: 'fsharp',
  },
  {
    id: LanguageId.Fortran_GFortran_9_2_0,
    name: 'Fortran (GFortran 9.2.0)',
    label: 'Fortran (GFortran 9.2.0)',
    value: 'fortran',
  },
  { id: LanguageId.Go_1_13_5, name: 'Go (1.13.5)', label: 'Go (1.13.5)', value: 'go' },
  { id: LanguageId.Groovy_3_0_3, name: 'Groovy (3.0.3)', label: 'Groovy (3.0.3)', value: 'groovy' },
  {
    id: LanguageId.Haskell_GHC_8_8_1,
    name: 'Haskell (GHC 8.8.1)',
    label: 'Haskell (GHC 8.8.1)',
    value: 'haskell',
  },
  {
    id: LanguageId.Java_OpenJDK_13_0_1,
    name: 'Java (OpenJDK 13.0.1)',
    label: 'Java (OpenJDK 13.0.1)',
    value: 'java',
  },
  {
    id: LanguageId.Kotlin_1_3_70,
    name: 'Kotlin (1.3.70)',
    label: 'Kotlin (1.3.70)',
    value: 'kotlin',
  },
  { id: LanguageId.Lua_5_3_5, name: 'Lua (5.3.5)', label: 'Lua (5.3.5)', value: 'lua' },
  {
    id: LanguageId.ObjectiveC_Clang_7_0_1,
    name: 'Objective-C (Clang 7.0.1)',
    label: 'Objective-C (Clang 7.0.1)',
    value: 'objectivec',
  },
  { id: LanguageId.OCaml_4_09_0, name: 'OCaml (4.09.0)', label: 'OCaml (4.09.0)', value: 'ocaml' },
  { id: LanguageId.Octave_5_1_0, name: 'Octave (5.1.0)', label: 'Octave (5.1.0)', value: 'octave' },
  {
    id: LanguageId.Pascal_FPC_3_0_4,
    name: 'Pascal (FPC 3.0.4)',
    label: 'Pascal (FPC 3.0.4)',
    value: 'pascal',
  },
  { id: LanguageId.Perl_5_28_1, name: 'Perl (5.28.1)', label: 'Perl (5.28.1)', value: 'perl' },
  { id: LanguageId.PHP_7_4_1, name: 'PHP (7.4.1)', label: 'PHP (7.4.1)', value: 'php' },
  { id: LanguageId.Plain_Text, name: 'Plain Text', label: 'Plain Text', value: 'text' },
  {
    id: LanguageId.Prolog_GNU_Prolog_1_4_5,
    name: 'Prolog (GNU Prolog 1.4.5)',
    label: 'Prolog (GNU Prolog 1.4.5)',
    value: 'prolog',
  },
  {
    id: LanguageId.Python_2_7_17,
    name: 'Python (2.7.17)',
    label: 'Python (2.7.17)',
    value: 'python',
  },
  { id: LanguageId.Python_3_8_1, name: 'Python (3.8.1)', label: 'Python (3.8.1)', value: 'python' },
  { id: LanguageId.R_4_0_0, name: 'R (4.0.0)', label: 'R (4.0.0)', value: 'r' },
  { id: LanguageId.Ruby_2_7_0, name: 'Ruby (2.7.0)', label: 'Ruby (2.7.0)', value: 'ruby' },
  { id: LanguageId.Rust_1_40_0, name: 'Rust (1.40.0)', label: 'Rust (1.40.0)', value: 'rust' },
  { id: LanguageId.Scala_2_13_2, name: 'Scala (2.13.2)', label: 'Scala (2.13.2)', value: 'scala' },
  {
    id: LanguageId.SQL_SQLite_3_27_2,
    name: 'SQL (SQLite 3.27.2)',
    label: 'SQL (SQLite 3.27.2)',
    value: 'sql',
  },
  { id: LanguageId.Swift_5_2_3, name: 'Swift (5.2.3)', label: 'Swift (5.2.3)', value: 'swift' },
  {
    id: LanguageId.TypeScript_3_7_4,
    name: 'TypeScript (3.7.4)',
    label: 'TypeScript (3.7.4)',
    value: 'typescript',
  },
  {
    id: LanguageId.Visual_Basic_Net_vbnc_0_0_0_5943,
    name: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    label: 'Visual Basic.Net (vbnc 0.0.0.5943)',
    value: 'vbnet',
  },
]
