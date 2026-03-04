import { Achievement } from "./types";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "quickdraw",
    name: {
      en: "Quickdraw",
      pt: "Saque Rápido",
    },
    description: {
      en: "Closed an issue or pull request within 5 minutes of opening.",
      pt: "Fechou uma issue ou pull request em menos de 5 minutos após a abertura.",
    },
    howToGet: {
      en: "Open an issue or pull request in one of your repositories and close it immediately (within 5 minutes).",
      pt: "Abra uma issue ou pull request em um de seus repositórios e feche-a imediatamente (dentro de 5 minutos).",
    },
    difficulty: "Easy",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
    isLegacy: false,
    order: 1,
  },
  {
    id: "yolo",
    name: {
      en: "YOLO",
      pt: "YOLO",
    },
    description: {
      en: "Merged a pull request without a review.",
      pt: "Mesclou um pull request sem uma revisão.",
    },
    howToGet: {
      en: "Create a pull request in a repository where you have merge permissions and merge it without any external review.",
      pt: "Crie um pull request em um repositório onde você tem permissão de merge e mescle-o sem nenhuma revisão externa.",
    },
    difficulty: "Easy",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
    isLegacy: false,
    order: 2,
  },
  {
    id: "pair-extraordinaire",
    name: {
      en: "Pair Extraordinaire",
      pt: "Par Extraordinário",
    },
    description: {
      en: "Co-authored a pull request that was merged.",
      pt: "Co-autorou um pull request que foi mesclado.",
    },
    howToGet: {
      en: 'Add a "Co-authored-by: Name <email>" trailer to a commit message in a pull request that gets merged.',
      pt: 'Adicione um trailer "Co-authored-by: Nome <email>" à mensagem de commit em um pull request que seja mesclado.',
    },
    difficulty: "Easy",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
    isLegacy: false,
    order: 3,
  },
  {
    id: "pull-shark",
    name: {
      en: "Pull Shark",
      pt: "Tubarão do Pull",
    },
    description: {
      en: "Opened pull requests that have been merged.",
      pt: "Abriu pull requests que foram mesclados.",
    },
    howToGet: {
      en: "Have your pull requests merged. Tiers: 2 (Bronze), 16 (Silver), 128 (Gold).",
      pt: "Tenha seus pull requests mesclados. Níveis: 2 (Bronze), 16 (Prata), 128 (Ouro).",
    },
    difficulty: "Medium",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
    isLegacy: false,
    order: 4,
  },
  {
    id: "heart-on-your-sleeve",
    name: {
      en: "Heart on Your Sleeve",
      pt: "Coração na Manga",
    },
    description: {
      en: "Sponsor an open source maintainer through GitHub Sponsors.",
      pt: "Patrocine um mantenedor de código aberto através do GitHub Sponsors.",
    },
    howToGet: {
      en: "Go to a profile with GitHub Sponsors enabled and contribute with any amount.",
      pt: "Vá para um perfil com GitHub Sponsors ativado e contribua com qualquer valor.",
    },
    difficulty: "Medium",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/heart-on-your-sleeve-default.png",
    isLegacy: false,
    order: 5,
  },
  {
    id: "starstruck",
    name: {
      en: "Starstruck",
      pt: "Estelar",
    },
    description: {
      en: "Created a repository that has reached a certain number of stars.",
      pt: "Criou um repositório que alcançou um certo número de estrelas.",
    },
    howToGet: {
      en: "Get stars on your repositories. Tiers: 16 (Bronze), 128 (Silver), 512 (Gold).",
      pt: "Ganhe estrelas em seus repositórios. Níveis: 16 (Bronze), 128 (Prata), 512 (Ouro).",
    },
    difficulty: "Hard",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png",
    isLegacy: false,
    order: 6,
  },
  {
    id: "galaxy-brain",
    name: {
      en: "Galaxy Brain",
      pt: "Cérebro Galáctico",
    },
    description: {
      en: "Had answers accepted in GitHub Discussions.",
      pt: "Teve respostas aceitas no GitHub Discussions.",
    },
    howToGet: {
      en: "Answer questions in the Discussions tab of repositories. Tiers: 2, 8, 16, 32.",
      pt: "Responda perguntas na aba Discussions de repositórios. Níveis: 2, 8, 16, 32.",
    },
    difficulty: "Hard",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
    isLegacy: false,
    order: 7,
  },
  {
    id: "arctic-code-vault-contributor",
    name: {
      en: "Arctic Code Vault Contributor",
      pt: "Contribuidor do Arctic Code Vault",
    },
    description: {
      en: "Contributed code to repositories in the 2020 Arctic Code Vault.",
      pt: "Contribuiu com código para repositórios no Arctic Code Vault de 2020.",
    },
    howToGet: {
      en: "This badge is no longer obtainable. It was awarded to those who contributed to projects archived in the Arctic Code Vault in 2020.",
      pt: "Este badge não pode mais ser obtido. Foi concedido a quem contribuiu para projetos arquivados no Arctic Code Vault em 2020.",
    },
    difficulty: "Legacy",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/arctic-code-vault-contributor-default.png",
    isLegacy: true,
    order: 8,
  },
  {
    id: "mars-2020-contributor",
    name: {
      en: "Mars 2020 Contributor",
      pt: "Contribuidor Mars 2020",
    },
    description: {
      en: "Contributed code to repositories used in the Mars 2020 Helicopter Mission.",
      pt: "Contribuiu com código para repositórios usados na Missão do Helicóptero Mars 2020.",
    },
    howToGet: {
      en: "This badge is no longer obtainable. It was awarded to contributors of specific libraries used by NASA for the Ingenuity helicopter.",
      pt: "Este badge não pode mais ser obtido. Foi concedido a contribuidores de bibliotecas específicas usadas pela NASA para o helicóptero Ingenuity.",
    },
    difficulty: "Legacy",
    image:
      "https://github.githubassets.com/images/modules/profile/achievements/mars-2020-contributor-default.png",
    isLegacy: true,
    order: 9,
  },
];
