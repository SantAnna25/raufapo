(() => {
  "use strict";

  /* ============================================================
     DADOS DO JOGO
     ============================================================ */

  const STORAGE_KEY = "raufapo_save_v2";
  const BOSS_HP = 999;
  const HIT_DAMAGE = 200;
  const TOTAL_BOSSES = 8;

  const BOSSES = [
    {
      name: "O Cientista Louco",
      img: "assets/bosses/cientista-louco.jpg",
      level: 5,
      accent: "#57d98b",
      glow: "rgba(87, 217, 139, 0.30)",
      diff: ["easy"],
      tagline: "Experimentos proibidos e perguntas letais.",
      taunt: "“Vamos ver se o seu cérebro aguenta o experimento.”",
      gold: 280,
      exp: 60,
    },
    {
      name: "A Rainha Aranha",
      img: "assets/bosses/rainha-aranha.jpg",
      level: 8,
      accent: "#a855f7",
      glow: "rgba(168, 85, 247, 0.34)",
      diff: ["easy", "medium"],
      tagline: "Uma teia de enigmas espera por você.",
      taunt: "“Cada erro seu me deixa mais forte.”",
      gold: 380,
      exp: 90,
    },
    {
      name: "O Golem Ancestral",
      img: "assets/bosses/golem-ancestral.jpg",
      level: 12,
      accent: "#94a3b8",
      glow: "rgba(148, 163, 184, 0.30)",
      diff: ["medium"],
      tagline: "Paciência de pedra. Golpes de montanha.",
      taunt: "“Pedra não sente dor. Você sentirá.”",
      gold: 520,
      exp: 130,
    },
    {
      name: "O Dragão Flamejante",
      img: "assets/bosses/dragao-flamejante.jpg",
      level: 16,
      accent: "#f97316",
      glow: "rgba(249, 115, 22, 0.34)",
      diff: ["medium"],
      tagline: "Seu hálito transforma dúvidas em cinzas.",
      taunt: "“Queime com a sua própria ignorância.”",
      gold: 700,
      exp: 180,
    },
    {
      name: "O Anjo Celestial",
      img: "assets/bosses/anjo-celestial.jpg",
      level: 20,
      accent: "#e9d5ff",
      glow: "rgba(233, 213, 255, 0.28)",
      diff: ["medium", "hard"],
      tagline: "Julgamento divino em forma de perguntas.",
      taunt: "“A luz revela cada resposta errada.”",
      gold: 920,
      exp: 240,
    },
    {
      name: "O Lorde Demônio",
      img: "assets/bosses/lorde-demonio.jpg",
      level: 25,
      accent: "#c084fc",
      glow: "rgba(192, 132, 252, 0.34)",
      diff: ["hard"],
      tagline: "Senhor dos pactos e das respostas difíceis.",
      taunt: "“Seu conhecimento tem um preço. Pague.”",
      gold: 1200,
      exp: 320,
    },
    {
      name: "O Rei Lich",
      img: "assets/bosses/rei-lich.jpg",
      level: 35,
      accent: "#60a5fa",
      glow: "rgba(96, 165, 250, 0.34)",
      diff: ["hard"],
      tagline: "Um rei morto que coleciona mentes brilhantes.",
      taunt: "“Sua alma será mais uma em meu exército.”",
      gold: 1550,
      exp: 420,
    },
    {
      name: "O Entidade Cósmica",
      img: "assets/bosses/entidade-cosmica.jpg",
      level: 99,
      accent: "#818cf8",
      glow: "rgba(129, 140, 248, 0.38)",
      diff: ["easy", "medium", "hard"],
      tagline: "O desafio final. O destino do reino em jogo.",
      taunt: "“Diante do infinito, o que você realmente sabe?”",
      gold: 2200,
      exp: 600,
    },
  ];

  const QUESTIONS = [
    /* ---------- FÁCEIS ---------- */
    { d: "easy", q: "O que a Sociologia do Meio Ambiente estuda?", options: ["Apenas os animais e as plantas.", "A relação entre sociedade e meio ambiente.", "Somente os fenômenos climáticos.", "Apenas a economia das cidades."], answer: "A relação entre sociedade e meio ambiente." },
    { d: "easy", q: "O que significa sustentabilidade?", options: ["Utilizar todos os recursos naturais disponíveis.", "Impedir qualquer atividade industrial.", "Atender às necessidades atuais sem comprometer as futuras gerações.", "Aumentar o consumo de produtos industrializados."], answer: "Atender às necessidades atuais sem comprometer as futuras gerações." },
    { d: "easy", q: "Qual das alternativas representa um recurso natural?", options: ["Água.", "Plástico.", "Concreto.", "Vidro."], answer: "Água." },
    { d: "easy", q: "O que é poluição ambiental?", options: ["A preservação das florestas.", "O crescimento das áreas verdes.", "A utilização consciente da água.", "A introdução de substâncias ou agentes prejudiciais ao ambiente."], answer: "A introdução de substâncias ou agentes prejudiciais ao ambiente." },
    { d: "easy", q: "Qual atitude contribui para a preservação ambiental?", options: ["Jogar lixo nos rios.", "Separar materiais recicláveis.", "Desmatar florestas.", "Desperdiçar água."], answer: "Separar materiais recicláveis." },
    { d: "easy", q: "O que é reciclagem?", options: ["Transformar materiais usados em novos produtos.", "Queimar todo o lixo produzido.", "Jogar resíduos na natureza.", "Enterrar materiais em qualquer lugar."], answer: "Transformar materiais usados em novos produtos." },
    { d: "easy", q: "Qual é uma das principais causas do desmatamento?", options: ["Plantio de árvores nativas.", "Criação de parques ambientais.", "Expansão agropecuária e exploração madeireira.", "Preservação de reservas naturais."], answer: "Expansão agropecuária e exploração madeireira." },
    { d: "easy", q: "O que significa biodiversidade?", options: ["Quantidade de prédios em uma cidade.", "Variedade de seres vivos existentes em determinado ambiente.", "Quantidade de lixo produzido.", "Crescimento da população humana."], answer: "Variedade de seres vivos existentes em determinado ambiente." },
    { d: "easy", q: "Qual gás está diretamente relacionado à intensificação do efeito estufa pelas atividades humanas?", options: ["Oxigênio.", "Nitrogênio.", "Hélio.", "Dióxido de carbono."], answer: "Dióxido de carbono." },
    { d: "easy", q: "O que é consumo consciente?", options: ["Comprar apenas produtos importados.", "Comprar o máximo possível.", "Consumir considerando os impactos sociais e ambientais.", "Evitar todos os produtos recicláveis."], answer: "Consumir considerando os impactos sociais e ambientais." },
    { d: "easy", q: "Qual ambiente é diretamente prejudicado pelo descarte de esgoto sem tratamento?", options: ["Oceanos e rios.", "Apenas desertos.", "Somente montanhas.", "Apenas florestas congeladas."], answer: "Oceanos e rios." },
    { d: "easy", q: "O que são recursos naturais renováveis?", options: ["Recursos que nunca acabam, independentemente do uso.", "Recursos que podem se regenerar naturalmente em determinadas condições.", "Recursos produzidos exclusivamente pelas indústrias.", "Recursos que não existem na natureza."], answer: "Recursos que podem se regenerar naturalmente em determinadas condições." },
    { d: "easy", q: "Qual é a principal função das áreas de preservação ambiental?", options: ["Aumentar a construção de indústrias.", "Incentivar o desmatamento.", "Proteger ecossistemas e recursos naturais.", "Substituir todas as áreas rurais."], answer: "Proteger ecossistemas e recursos naturais." },
    { d: "easy", q: "O que é educação ambiental?", options: ["Um estudo exclusivo sobre animais domésticos.", "Uma disciplina que ensina apenas geografia.", "Uma atividade destinada somente aos cientistas.", "Um processo de conscientização sobre questões ambientais."], answer: "Um processo de conscientização sobre questões ambientais." },
    { d: "easy", q: "Qual atividade humana contribui para a poluição do ar?", options: ["Emissão de gases por veículos e indústrias.", "Plantio de árvores.", "Preservação de florestas.", "Uso de bicicletas."], answer: "Emissão de gases por veículos e indústrias." },
    { d: "easy", q: "O que significa coleta seletiva?", options: ["Misturar todos os resíduos.", "Separar os resíduos de acordo com suas características.", "Jogar o lixo em terrenos baldios.", "Queimar materiais recicláveis."], answer: "Separar os resíduos de acordo com suas características." },
    { d: "easy", q: "Qual é uma consequência do aquecimento global?", options: ["Diminuição de todas as temperaturas do planeta.", "Fim da poluição industrial.", "Alterações nos padrões climáticos.", "Desaparecimento imediato de todos os oceanos."], answer: "Alterações nos padrões climáticos." },
    { d: "easy", q: "Qual é o papel dos cidadãos na preservação ambiental?", options: ["Deixar toda a responsabilidade para as empresas.", "Ignorar os problemas ambientais.", "Incentivar o desperdício de recursos.", "Adotar práticas sustentáveis e participar das decisões coletivas."], answer: "Adotar práticas sustentáveis e participar das decisões coletivas." },

    /* ---------- MÉDIAS ---------- */
    { d: "medium", q: "Como a Sociologia do Meio Ambiente relaciona sociedade e natureza?", options: ["Considera que a natureza não sofre influência humana.", "Analisa como as relações sociais, econômicas e culturais influenciam o ambiente.", "Estuda exclusivamente os fenômenos naturais.", "Defende que os problemas ambientais são exclusivamente individuais."], answer: "Analisa como as relações sociais, econômicas e culturais influenciam o ambiente." },
    { d: "medium", q: "O que é desenvolvimento sustentável?", options: ["Crescimento econômico sem considerar os recursos naturais.", "Proibição de qualquer atividade econômica.", "Desenvolvimento que busca equilibrar economia, sociedade e meio ambiente.", "Expansão industrial sem planejamento."], answer: "Desenvolvimento que busca equilibrar economia, sociedade e meio ambiente." },
    { d: "medium", q: "O que caracteriza a justiça ambiental?", options: ["Distribuição justa dos benefícios ambientais e dos riscos da degradação.", "Concentração da poluição nas regiões mais pobres.", "Proteção ambiental exclusiva das áreas ricas.", "Ausência de participação popular nas decisões."], answer: "Distribuição justa dos benefícios ambientais e dos riscos da degradação." },
    { d: "medium", q: "Como o capitalismo pode contribuir para problemas ambientais?", options: ["Eliminando automaticamente a poluição.", "Impedindo o consumo de recursos naturais.", "Garantindo a preservação de todos os ecossistemas.", "Estimulando a produção e o consumo em larga escala, aumentando a pressão sobre os recursos naturais."], answer: "Estimulando a produção e o consumo em larga escala, aumentando a pressão sobre os recursos naturais." },
    { d: "medium", q: "O que é consumismo?", options: ["Comprar somente o necessário.", "Consumo excessivo de produtos, muitas vezes sem necessidade.", "Reutilizar materiais diariamente.", "Reduzir a produção de resíduos."], answer: "Consumo excessivo de produtos, muitas vezes sem necessidade." },
    { d: "medium", q: "Qual é uma consequência social do desmatamento?", options: ["Aumento da qualidade de vida de todas as comunidades.", "Eliminação das desigualdades sociais.", "Deslocamento de comunidades tradicionais e perda de seus meios de subsistência.", "Crescimento automático da biodiversidade."], answer: "Deslocamento de comunidades tradicionais e perda de seus meios de subsistência." },
    { d: "medium", q: "O que são movimentos ambientalistas?", options: ["Organizações e grupos que defendem a proteção ambiental.", "Grupos que incentivam a exploração ilimitada da natureza.", "Empresas que atuam exclusivamente no setor industrial.", "Instituições que combatem a educação ambiental."], answer: "Organizações e grupos que defendem a proteção ambiental." },
    { d: "medium", q: "Qual é a relação entre desigualdade social e problemas ambientais?", options: ["Todas as classes sociais sofrem os mesmos impactos ambientais.", "A desigualdade social elimina os riscos ambientais.", "Os impactos ambientais atingem exclusivamente as classes mais ricas.", "Grupos socialmente vulneráveis frequentemente sofrem impactos ambientais mais intensos."], answer: "Grupos socialmente vulneráveis frequentemente sofrem impactos ambientais mais intensos." },
    { d: "medium", q: "O que significa pegada ecológica?", options: ["A quantidade de árvores existentes em uma cidade.", "Uma medida da pressão do consumo humano sobre os recursos naturais.", "O número de animais de uma floresta.", "A quantidade de chuva em determinado território."], answer: "Uma medida da pressão do consumo humano sobre os recursos naturais." },
    { d: "medium", q: "Qual é a importância das energias renováveis?", options: ["Aumentar a dependência de combustíveis fósseis.", "Eliminar a necessidade de eletricidade.", "Oferecer alternativas energéticas que podem reduzir impactos ambientais.", "Impedir o desenvolvimento tecnológico."], answer: "Oferecer alternativas energéticas que podem reduzir impactos ambientais." },
    { d: "medium", q: "O que é racismo ambiental?", options: ["A distribuição desigual de danos ambientais que afeta especialmente grupos racializados e comunidades vulneráveis.", "A preservação de florestas em regiões urbanas.", "A criação de políticas de reciclagem.", "A utilização de energia solar nas cidades."], answer: "A distribuição desigual de danos ambientais que afeta especialmente grupos racializados e comunidades vulneráveis." },
    { d: "medium", q: "Como a urbanização desordenada pode prejudicar o meio ambiente?", options: ["Reduzindo automaticamente a produção de lixo.", "Aumentando todas as áreas verdes.", "Eliminando a poluição dos rios.", "Favorecendo ocupações em áreas de risco, enchentes e falta de saneamento."], answer: "Favorecendo ocupações em áreas de risco, enchentes e falta de saneamento." },
    { d: "medium", q: "Qual é o objetivo principal da Agenda 2030 da ONU?", options: ["Incentivar exclusivamente o crescimento industrial.", "Promover o desenvolvimento sustentável por meio dos Objetivos de Desenvolvimento Sustentável.", "Eliminar todas as atividades agrícolas.", "Substituir os governos nacionais."], answer: "Promover o desenvolvimento sustentável por meio dos Objetivos de Desenvolvimento Sustentável." },
    { d: "medium", q: "O que são combustíveis fósseis?", options: ["Fontes de energia produzidas pela luz solar.", "Recursos naturais que se renovam rapidamente.", "Carvão mineral, petróleo e gás natural.", "Fontes de energia exclusivamente eólicas."], answer: "Carvão mineral, petróleo e gás natural." },
    { d: "medium", q: "Qual é a relação entre meio ambiente e saúde pública?", options: ["A qualidade ambiental influencia diretamente as condições de saúde da população.", "A poluição não interfere na saúde humana.", "O saneamento básico não possui relação com doenças.", "A preservação ambiental não beneficia as comunidades."], answer: "A qualidade ambiental influencia diretamente as condições de saúde da população." },
    { d: "medium", q: "Por que as comunidades tradicionais são importantes para a conservação ambiental?", options: ["Porque não utilizam nenhum recurso natural.", "Porque impedem qualquer transformação social.", "Porque são responsáveis por toda a produção industrial.", "Porque possuem conhecimentos e práticas que podem contribuir para a preservação dos ecossistemas."], answer: "Porque possuem conhecimentos e práticas que podem contribuir para a preservação dos ecossistemas." },
    { d: "medium", q: "O que significa responsabilidade socioambiental das empresas?", options: ["Buscar lucro independentemente das consequências.", "Considerar os impactos sociais e ambientais de suas atividades.", "Transferir toda a responsabilidade ambiental para os consumidores.", "Evitar investimentos em sustentabilidade."], answer: "Considerar os impactos sociais e ambientais de suas atividades." },
    { d: "medium", q: "Qual é uma consequência do descarte inadequado de resíduos eletrônicos?", options: ["Aumento da fertilidade de todos os solos.", "Produção natural de água potável.", "Contaminação do solo e da água por substâncias perigosas.", "Redução automática da poluição industrial."], answer: "Contaminação do solo e da água por substâncias perigosas." },
    { d: "medium", q: "O que caracteriza a economia circular?", options: ["Reutilização, reparação e reciclagem de materiais para reduzir desperdícios.", "Produção baseada no descarte imediato.", "Extração ilimitada de matérias-primas.", "Eliminação de todas as formas de comércio."], answer: "Reutilização, reparação e reciclagem de materiais para reduzir desperdícios." },
    { d: "medium", q: "Qual é a importância das políticas públicas ambientais?", options: ["Garantir privilégios exclusivamente às indústrias.", "Impedir a participação da sociedade.", "Incentivar o uso irresponsável dos recursos naturais.", "Estabelecer medidas e regras para proteger o meio ambiente."], answer: "Estabelecer medidas e regras para proteger o meio ambiente." },

    /* ---------- DIFÍCEIS ---------- */
    { d: "hard", q: "O que representa o conceito de sociedade de risco, desenvolvido por Ulrich Beck?", options: ["Uma sociedade sem problemas ambientais.", "Uma sociedade em que os riscos são exclusivamente naturais.", "Uma sociedade moderna que produz riscos ambientais e tecnológicos como consequência do próprio desenvolvimento.", "Uma sociedade que abandonou completamente a industrialização."], answer: "Uma sociedade moderna que produz riscos ambientais e tecnológicos como consequência do próprio desenvolvimento." },
    { d: "hard", q: "Segundo a perspectiva da ecologia política, os problemas ambientais devem ser compreendidos considerando:", options: ["Apenas os ciclos naturais dos ecossistemas.", "As relações de poder, os conflitos sociais e a distribuição dos recursos naturais.", "Exclusivamente as decisões individuais dos consumidores.", "Somente os avanços tecnológicos."], answer: "As relações de poder, os conflitos sociais e a distribuição dos recursos naturais." },
    { d: "hard", q: "Qual é a principal crítica da teoria da modernização ecológica ao modelo tradicional de desenvolvimento?", options: ["A tecnologia e as instituições podem ser reorganizadas para tornar a produção mais sustentável, sem abandonar necessariamente a modernização.", "A sociedade deve abandonar toda forma de tecnologia.", "A industrialização nunca pode ser modificada.", "A preservação ambiental é incompatível com qualquer atividade econômica."], answer: "A tecnologia e as instituições podem ser reorganizadas para tornar a produção mais sustentável, sem abandonar necessariamente a modernização." },
    { d: "hard", q: "O que significa colonialismo ambiental?", options: ["A criação de reservas naturais em países desenvolvidos.", "A cooperação internacional para proteger os oceanos.", "A utilização de tecnologias limpas em países pobres.", "A transferência dos custos ambientais da produção e do consumo para territórios e populações mais vulneráveis."], answer: "A transferência dos custos ambientais da produção e do consumo para territórios e populações mais vulneráveis." },
    { d: "hard", q: "O que é justiça climática?", options: ["Garantir que todos os países emitam a mesma quantidade de gases.", "Considerar as desigualdades sociais e históricas na distribuição dos impactos e das responsabilidades pelas mudanças climáticas.", "Impedir que países em desenvolvimento utilizem energia.", "Tratar as mudanças climáticas apenas como um problema tecnológico."], answer: "Considerar as desigualdades sociais e históricas na distribuição dos impactos e das responsabilidades pelas mudanças climáticas." },
    { d: "hard", q: "Qual é a principal ideia do conceito de Antropoceno?", options: ["A natureza deixou de sofrer transformações.", "A humanidade não influencia os processos geológicos.", "As atividades humanas passaram a exercer influência significativa nos sistemas naturais do planeta.", "O planeta está livre de impactos industriais."], answer: "As atividades humanas passaram a exercer influência significativa nos sistemas naturais do planeta." },
    { d: "hard", q: "O que caracteriza o conceito de metabolismo social?", options: ["As trocas de energia e materiais entre sociedade e natureza por meio da produção e do consumo.", "O funcionamento biológico exclusivo dos seres humanos.", "A substituição da natureza pelas tecnologias digitais.", "A relação entre alimentação e comportamento individual, sem considerar o ambiente."], answer: "As trocas de energia e materiais entre sociedade e natureza por meio da produção e do consumo." },
    { d: "hard", q: "Na teoria de Karl Marx, como pode ser interpretada a chamada ruptura metabólica?", options: ["Como a eliminação das relações entre sociedade e natureza.", "Como a recuperação automática dos ecossistemas pela industrialização.", "Como a ausência de conflitos entre produção e ambiente.", "Como a ruptura do equilíbrio das trocas materiais entre sociedade e natureza, intensificada pelas relações capitalistas de produção."], answer: "Como a ruptura do equilíbrio das trocas materiais entre sociedade e natureza, intensificada pelas relações capitalistas de produção." },
    { d: "hard", q: "O que significa externalização dos custos ambientais?", options: ["Quando uma empresa paga integralmente por todos os impactos que produz.", "Quando os danos ambientais são transferidos para a sociedade, enquanto os responsáveis não arcam integralmente com seus custos.", "Quando os consumidores deixam de comprar produtos industriais.", "Quando o governo elimina todas as atividades econômicas."], answer: "Quando os danos ambientais são transferidos para a sociedade, enquanto os responsáveis não arcam integralmente com seus custos." },
    { d: "hard", q: "Qual é a principal diferença entre antropocentrismo e ecocentrismo?", options: ["O antropocentrismo defende a natureza, enquanto o ecocentrismo defende exclusivamente a indústria.", "Ambos consideram somente os interesses econômicos.", "O antropocentrismo coloca o ser humano no centro das preocupações, enquanto o ecocentrismo reconhece o valor dos ecossistemas e da natureza.", "O ecocentrismo considera que os seres humanos não fazem parte da natureza."], answer: "O antropocentrismo coloca o ser humano no centro das preocupações, enquanto o ecocentrismo reconhece o valor dos ecossistemas e da natureza." },
    { d: "hard", q: "O que é uma zona de sacrifício ambiental?", options: ["Uma região que concentra atividades poluentes e sofre danos ambientais em benefício de interesses econômicos mais amplos.", "Uma área destinada exclusivamente à preservação de espécies.", "Um território sem atividades humanas.", "Uma região que recebe investimentos exclusivamente em saneamento."], answer: "Uma região que concentra atividades poluentes e sofre danos ambientais em benefício de interesses econômicos mais amplos." },
    { d: "hard", q: "Como a divisão internacional do trabalho pode contribuir para a desigualdade ambiental?", options: ["Distribuindo igualmente os impactos ambientais entre todos os países.", "Impedindo a exploração de recursos naturais.", "Eliminando as diferenças econômicas internacionais.", "Concentrando atividades poluentes e extração de recursos em países ou regiões economicamente dependentes."], answer: "Concentrando atividades poluentes e extração de recursos em países ou regiões economicamente dependentes." },
    { d: "hard", q: "O que significa governança ambiental?", options: ["Administração exclusiva dos recursos naturais por empresas privadas.", "Processo de participação e articulação entre governos, sociedade civil, empresas e outras instituições nas decisões ambientais.", "Eliminação da legislação ambiental.", "Transferência de todas as decisões ambientais para organismos internacionais."], answer: "Processo de participação e articulação entre governos, sociedade civil, empresas e outras instituições nas decisões ambientais." },
    { d: "hard", q: "Qual é a principal contribuição do conceito de bens comuns ambientais?", options: ["Defender que todos os recursos naturais devem pertencer a empresas privadas.", "Impedir qualquer utilização coletiva dos recursos naturais.", "Reconhecer que determinados recursos podem ser compartilhados e exigem regras coletivas de gestão e preservação.", "Considerar que os recursos naturais não possuem valor social."], answer: "Reconhecer que determinados recursos podem ser compartilhados e exigem regras coletivas de gestão e preservação." },
    { d: "hard", q: "Na perspectiva de Elinor Ostrom, qual estratégia pode contribuir para a gestão sustentável dos recursos comuns?", options: ["Criar regras coletivas adaptadas à realidade local, com participação dos usuários e mecanismos de acompanhamento.", "Impedir qualquer participação comunitária.", "Entregar obrigatoriamente todos os recursos ao mercado internacional.", "Permitir a exploração sem limites individuais ou coletivos."], answer: "Criar regras coletivas adaptadas à realidade local, com participação dos usuários e mecanismos de acompanhamento." },
    { d: "hard", q: "O que caracteriza a chamada dívida ecológica?", options: ["Uma dívida financeira contraída exclusivamente por empresas ambientais.", "O valor gasto na construção de parques urbanos.", "A quantidade de dinheiro investida em energia renovável.", "A responsabilidade histórica e desigual pelos danos ambientais e pela exploração dos recursos naturais."], answer: "A responsabilidade histórica e desigual pelos danos ambientais e pela exploração dos recursos naturais." },
    { d: "hard", q: "Qual é a relação entre necropolítica e desigualdade ambiental?", options: ["A garantia de proteção ambiental igualitária para toda a população.", "A exposição desigual de determinadas populações a condições que ameaçam sua vida e sua sobrevivência, relacionada às estruturas de poder.", "A eliminação das desigualdades por meio do crescimento econômico.", "A distribuição uniforme dos riscos ambientais."], answer: "A exposição desigual de determinadas populações a condições que ameaçam sua vida e sua sobrevivência, relacionada às estruturas de poder." },
    { d: "hard", q: "O que significa decrescimento econômico na perspectiva dos estudos ambientais?", options: ["Aumento ilimitado da produção industrial.", "Redução da qualidade de vida de toda a população.", "Reorganização planejada da economia para reduzir o uso excessivo de recursos e priorizar o bem-estar coletivo.", "Eliminação de todos os serviços públicos."], answer: "Reorganização planejada da economia para reduzir o uso excessivo de recursos e priorizar o bem-estar coletivo." },
    { d: "hard", q: "Qual é a principal crítica da perspectiva da justiça ambiental ao conceito de desenvolvimento sustentável quando aplicado sem considerar desigualdades sociais?", options: ["Ele pode ocultar conflitos de poder e distribuir desigualmente os custos e benefícios das políticas ambientais.", "Ele impede qualquer forma de preservação.", "Ele elimina a participação das comunidades tradicionais em todos os casos.", "Ele considera exclusivamente os fenômenos naturais."], answer: "Ele pode ocultar conflitos de poder e distribuir desigualmente os custos e benefícios das políticas ambientais." },
    { d: "hard", q: "O que é captura regulatória no contexto das políticas ambientais?", options: ["Quando a população assume o controle das indústrias.", "Quando as leis ambientais são fortalecidas pela participação popular.", "Quando os órgãos públicos fiscalizam todas as empresas igualmente.", "Quando interesses privados influenciam órgãos reguladores para favorecer seus próprios objetivos."], answer: "Quando interesses privados influenciam órgãos reguladores para favorecer seus próprios objetivos." },
    { d: "hard", q: "Como a perspectiva da sociologia ambiental compreende os conflitos socioambientais?", options: ["Como problemas exclusivamente naturais, sem relação com a sociedade.", "Como disputas envolvendo recursos, território, poder, interesses econômicos e diferentes concepções sobre a natureza.", "Como acontecimentos que não envolvem desigualdades.", "Como conflitos que podem ser resolvidos somente pela tecnologia."], answer: "Como disputas envolvendo recursos, território, poder, interesses econômicos e diferentes concepções sobre a natureza." },
    { d: "hard", q: "Qual é a principal relação entre globalização e crise ambiental?", options: ["A globalização impede a circulação de produtos poluentes.", "A integração econômica elimina os impactos ambientais.", "A expansão das cadeias produtivas e do consumo global pode intensificar a exploração de recursos e a transferência de impactos ambientais entre territórios.", "A globalização torna todos os países igualmente responsáveis pelos danos ambientais."], answer: "A expansão das cadeias produtivas e do consumo global pode intensificar a exploração de recursos e a transferência de impactos ambientais entre territórios." },
  ];

  const DIFFICULTY_LABEL = { easy: "Fácil", medium: "Médio", hard: "Difícil" };
  const LETTERS = ["A", "B", "C", "D"];

  /* ============================================================
     ESTADO
     ============================================================ */

  function createPlayer() {
    return { level: 1, maxHp: 120, maxMp: 50, hp: 120, mp: 50, gold: 0, exp: 0, potions: 1 };
  }

  const state = {
    screen: "menu",
    returnTo: "menu",
    progress: { defeated: 0, completed: false },
    player: createPlayer(),
    settings: { sfx: true, reduceMotion: false },
    battle: null,
    defeatBossIndex: 0,
    isPaused: false,
    toastTimer: null,
    heroTimer: null,
    heroIndex: 0,
    audioCtx: null,
  };

  /* ============================================================
     REFERÊNCIAS DOM
     ============================================================ */

  const $ = (id) => document.getElementById(id);

  const el = {
    screens: Array.from(document.querySelectorAll(".screen")),
    toast: $("toast"),
    btnContinue: $("btn-continue"),
    btnNewGame: $("btn-new-game"),
    menuHeroImg: $("menu-hero-img"),
    menuHeroName: $("menu-hero-name"),
    bossGrid: $("boss-grid"),
    selectLevel: $("select-level"),
    selectGold: $("select-gold"),
    selectPotions: $("select-potions"),
    selectSubtitle: $("select-subtitle"),
    selectFooterText: $("select-footer-text"),
    battleProgress: $("battle-progress"),
    battleGold: $("battle-gold"),
    bossName: $("battle-boss-name"),
    bossLv: $("battle-boss-lv"),
    bossImg: $("battle-boss-img"),
    bossHpFill: $("boss-hp-fill"),
    bossHpText: $("boss-hp-text"),
    bossFrame: $("boss-frame"),
    bossDamageLayer: $("boss-damage-layer"),
    bossTaunt: $("boss-taunt"),
    questionNumber: $("question-number"),
    questionDifficulty: $("question-difficulty"),
    questionText: $("question-text"),
    answers: $("answers"),
    feedback: $("feedback"),
    playerLevel: $("player-level"),
    playerHpFill: $("player-hp-fill"),
    playerHpText: $("player-hp-text"),
    playerMpFill: $("player-mp-fill"),
    playerMpText: $("player-mp-text"),
    playerAvatar: $("player-avatar"),
    playerDamageLayer: $("player-damage-layer"),
    potionBtn: $("btn-potion"),
    potionCount: $("potion-count"),
    pauseOverlay: $("overlay-pause"),
    pauseBossName: $("pause-boss-name"),
    rewardGold: $("reward-gold"),
    rewardExp: $("reward-exp"),
    rewardItem: $("reward-item"),
    victoryLevelUp: $("victory-levelup"),
    victoryNewLevel: $("victory-new-level"),
    defeatBoss: $("defeat-boss"),
    completionBosses: $("completion-bosses"),
    completionLevel: $("completion-level"),
    completionGold: $("completion-gold"),
    setSfx: $("set-sfx"),
    setMotion: $("set-motion"),
    battleScreen: $("screen-battle"),
  };

  /* ============================================================
     UTILITÁRIOS
     ============================================================ */

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function clampInt(value, min, max, fallback) {
    const number = Number.parseInt(value, 10);
    if (Number.isNaN(number)) return fallback;
    return Math.min(max, Math.max(min, number));
  }

  function showToast(message) {
    if (!el.toast) return;
    el.toast.textContent = message;
    el.toast.classList.add("show");
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => {
      el.toast.classList.remove("show");
    }, 2600);
  }

  /* ============================================================
     SOM
     ============================================================ */

  function getAudioContext() {
    if (!state.settings.sfx) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!state.audioCtx) state.audioCtx = new AudioCtx();
    if (state.audioCtx.state === "suspended") state.audioCtx.resume();
    return state.audioCtx;
  }

  function tone(frequency, duration, type = "sine", volume = 0.06, delay = 0) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  }

  const sfx = {
    click() {
      tone(430, 0.05, "sine", 0.025);
    },
    correct() {
      tone(523.25, 0.13, "triangle", 0.07, 0);
      tone(659.25, 0.13, "triangle", 0.07, 0.09);
      tone(783.99, 0.2, "triangle", 0.07, 0.18);
    },
    wrong() {
      tone(180, 0.2, "sawtooth", 0.055, 0);
      tone(120, 0.3, "sawtooth", 0.05, 0.12);
    },
    heal() {
      tone(587.33, 0.12, "sine", 0.06, 0);
      tone(880, 0.2, "sine", 0.06, 0.1);
    },
    victory() {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        tone(freq, 0.28, "triangle", 0.065, index * 0.13);
      });
    },
    defeat() {
      [392, 329.63, 261.63, 196].forEach((freq, index) => {
        tone(freq, 0.34, "sine", 0.06, index * 0.16);
      });
    },
  };

  /* ============================================================
     PARTÍCULAS DE FUNDO
     ============================================================ */

  const canvas = $("particles");
  const particleCtx = canvas ? canvas.getContext("2d") : null;
  let particles = [];
  let particleColor = "#a855f7";
  let particleFrame = null;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    particleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const count = window.innerWidth < 640 ? 24 : 58;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: randomBetween(0.6, 2.2),
      speed: randomBetween(0.12, 0.55),
      drift: randomBetween(-0.18, 0.18),
      alpha: randomBetween(0.14, 0.5),
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function drawParticles() {
    if (!particleCtx) return;
    if (state.settings.reduceMotion) {
      particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particleFrame = null;
      return;
    }
    particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particleCtx.fillStyle = particleColor;
    const time = Date.now() / 2200;
    particles.forEach((particle) => {
      particle.y -= particle.speed;
      particle.x += Math.sin(time + particle.phase) * 0.22 + particle.drift;
      if (particle.y < -12) {
        particle.y = window.innerHeight + 12;
        particle.x = Math.random() * window.innerWidth;
      }
      if (particle.x < -12) particle.x = window.innerWidth + 12;
      if (particle.x > window.innerWidth + 12) particle.x = -12;
      particleCtx.globalAlpha = particle.alpha;
      particleCtx.beginPath();
      particleCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      particleCtx.fill();
    });
    particleCtx.globalAlpha = 1;
    particleFrame = window.requestAnimationFrame(drawParticles);
  }

  function startParticles() {
    if (particleFrame) {
      window.cancelAnimationFrame(particleFrame);
      particleFrame = null;
    }
    if (!state.settings.reduceMotion) {
      particleFrame = window.requestAnimationFrame(drawParticles);
    }
  }

  function setParticleColor(color) {
    particleColor = color;
  }

  /* ============================================================
     SAVE / LOAD
     ============================================================ */

  function hasProgress() {
    return state.progress.defeated > 0 || state.progress.completed;
  }

  function saveGame() {
    try {
      const data = {
        version: 2,
        progress: state.progress,
        player: state.player,
        settings: state.settings,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      /* Armazenamento indisponível: o jogo continua sem save. */
    }
  }

  function loadGame() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || data.version !== 2 || !data.player || !data.progress) return false;

      const defeated = clampInt(data.progress.defeated, 0, TOTAL_BOSSES, 0);
      const completed = Boolean(data.progress.completed) || defeated >= TOTAL_BOSSES;

      state.progress = {
        defeated: completed ? TOTAL_BOSSES : defeated,
        completed,
      };

      state.player = {
        level: clampInt(data.player.level, 1, 99, 1),
        maxHp: clampInt(data.player.maxHp, 100, 999, 120),
        maxMp: clampInt(data.player.maxMp, 20, 999, 50),
        hp: clampInt(data.player.hp, 1, 999, 120),
        mp: clampInt(data.player.mp, 0, 999, 50),
        gold: clampInt(data.player.gold, 0, 99999999, 0),
        exp: clampInt(data.player.exp, 0, 99999999, 0),
        potions: clampInt(data.player.potions, 0, 999, 1),
      };
      state.player.hp = Math.min(state.player.hp, state.player.maxHp);
      state.player.mp = Math.min(state.player.mp, state.player.maxMp);

      if (data.settings) {
        state.settings.sfx = data.settings.sfx !== false;
        state.settings.reduceMotion = Boolean(data.settings.reduceMotion);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  function resetProgress(showMessage = true) {
    state.progress = { defeated: 0, completed: false };
    state.player = createPlayer();
    state.battle = null;
    state.defeatBossIndex = 0;
    state.isPaused = false;
    state.returnTo = "menu";
    saveGame();
    syncSettingsUI();
    updateContinueVisibility();
    renderBossGrid();
    if (showMessage) showToast("Progresso apagado. Uma nova jornada pode começar.");
  }

  function updateContinueVisibility() {
    const available = hasProgress();
    el.btnContinue.classList.toggle("hidden", !available);
    el.btnNewGame.classList.toggle("primary", !available);
  }

  /* ============================================================
     NAVEGAÇÃO
     ============================================================ */

  function showScreen(name) {
    el.screens.forEach((screen) => screen.classList.remove("active"));
    const target = $("screen-" + name);
    if (target) target.classList.add("active");
    state.screen = name;
    el.pauseOverlay.classList.add("hidden");
    window.scrollTo(0, 0);

    if (name === "select") {
      updateSelectScreen();
    }
    if (name === "menu") {
      updateContinueVisibility();
      startHeroCycle();
      setParticleColor("#a855f7");
    } else {
      stopHeroCycle();
    }
  }

  function openInfo(name) {
    const pauseVisible = !el.pauseOverlay.classList.contains("hidden");
    state.returnTo = pauseVisible || state.screen === "battle" ? "pause" : "menu";
    if (name === "settings") syncSettingsUI();
    showScreen(name);
  }

  function goBack() {
    if (state.returnTo === "pause" && state.battle) {
      showScreen("battle");
      state.isPaused = true;
      el.pauseBossName.textContent = state.battle.boss.name;
      el.pauseOverlay.classList.remove("hidden");
      return;
    }
    state.returnTo = "menu";
    showScreen("menu");
  }

  function goToMenuFromSelect() {
    state.returnTo = "menu";
    saveGame();
    showScreen("menu");
  }

  function quitBattleToMenu() {
    if (state.battle && !state.battle.over) {
      const confirmed = window.confirm("Sair da batalha atual e voltar ao menu? O progresso dos chefes derrotados será mantido.");
      if (!confirmed) return;
    }
    state.battle = null;
    state.isPaused = false;
    state.returnTo = "menu";
    state.player.hp = state.player.maxHp;
    state.player.mp = state.player.maxMp;
    saveGame();
    showScreen("menu");
  }

  function attemptExit() {
    try {
      window.open("", "_self");
      window.close();
    } catch (error) {
      /* Alguns navegadores bloqueiam o fechamento. */
    }
    window.setTimeout(() => {
      showToast("Se esta aba não fechar, feche-a manualmente.");
    }, 220);
  }

  /* ============================================================
     MENU / HERÓI EM DESTAQUE
     ============================================================ */

  function setHero(index) {
    if (!el.menuHeroImg || !el.menuHeroName) return;
    state.heroIndex = ((index % BOSSES.length) + BOSSES.length) % BOSSES.length;
    const boss = BOSSES[state.heroIndex];
    el.menuHeroImg.style.opacity = "0";
    window.setTimeout(() => {
      el.menuHeroImg.src = boss.img;
      el.menuHeroImg.alt = boss.name;
      el.menuHeroName.textContent = boss.name;
      el.menuHeroImg.style.opacity = "1";
    }, 220);
  }

  function startHeroCycle() {
    stopHeroCycle();
    setHero(state.heroIndex);
    if (state.settings.reduceMotion) return;
    state.heroTimer = window.setInterval(() => {
      setHero(state.heroIndex + 1);
    }, 4200);
  }

  function stopHeroCycle() {
    if (state.heroTimer) {
      window.clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  /* ============================================================
     CONFIGURAÇÕES
     ============================================================ */

  function applySettings() {
    document.body.classList.toggle("reduce-motion", state.settings.reduceMotion);
    if (state.settings.reduceMotion) {
      if (particleFrame) {
        window.cancelAnimationFrame(particleFrame);
        particleFrame = null;
      }
      if (particleCtx) particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } else {
      startParticles();
    }
    if (state.screen === "menu") startHeroCycle();
  }

  function syncSettingsUI() {
    el.setSfx.checked = state.settings.sfx;
    el.setMotion.checked = state.settings.reduceMotion;
    document.body.classList.toggle("reduce-motion", state.settings.reduceMotion);
  }

  /* ============================================================
     SELEÇÃO DE CHEFES
     ============================================================ */

  function updateSelectScreen() {
    el.selectLevel.textContent = state.player.level;
    el.selectGold.textContent = state.player.gold;
    el.selectPotions.textContent = state.player.potions;
    renderBossGrid();

    if (state.progress.completed) {
      el.selectSubtitle.textContent = "Todos os chefes foram derrotados. O reino está salvo.";
      el.selectFooterText.textContent = "Sua lenda foi escrita. Obrigado por jogar.";
      return;
    }

    if (state.progress.defeated === 0) {
      el.selectSubtitle.textContent = "O primeiro chefe aguarda. Escolha com sabedoria.";
      el.selectFooterText.textContent = "Responda certo para atacar. Responda errado e sofra o contra-ataque.";
    } else if (state.progress.defeated >= TOTAL_BOSSES - 1) {
      el.selectSubtitle.textContent = "O desafio final está diante de você.";
      el.selectFooterText.textContent = "Tudo o que aprendeu até aqui será testado agora.";
    } else {
      el.selectSubtitle.textContent = "O próximo chefe está à sua espera.";
      el.selectFooterText.textContent = `${state.progress.defeated} de ${TOTAL_BOSSES} chefes derrotados.`;
    }
  }

  function renderBossGrid() {
    if (!el.bossGrid) return;
    el.bossGrid.innerHTML = "";

    BOSSES.forEach((boss, index) => {
      let status = "locked";
      if (state.progress.completed || index < state.progress.defeated) {
        status = "defeated";
      } else if (index === state.progress.defeated) {
        status = "current";
      }

      const card = document.createElement("button");
      card.type = "button";
      card.className = `boss-card ${status}`;
      card.dataset.boss = String(index);
      card.style.setProperty("--accent", boss.accent);
      card.style.setProperty("--boss-glow", boss.glow);
      card.setAttribute(
        "aria-label",
        `${boss.name}, nível ${boss.level}. ${status === "locked" ? "Bloqueado." : status === "defeated" ? "Já derrotado." : "Disponível para batalha."}`
      );

      const statusLabel = status === "defeated" ? "Derrotado" : status === "current" ? "Disponível" : "Bloqueado";
      const difficultyLabel = boss.diff.map((d) => DIFFICULTY_LABEL[d]).join(" / ");

      card.innerHTML = `
        <div class="boss-card-media">
          <img src="${boss.img}" alt="${boss.name}" loading="lazy">
          <div class="boss-card-shade"></div>
          <span class="boss-card-lv">Lv. ${boss.level}</span>
          <span class="status-badge ${status}">${statusLabel}</span>
        </div>
        <div class="boss-card-body">
          <h3>${boss.name}</h3>
          <p>${boss.tagline}</p>
          <div class="boss-card-stats">
            <span>HP <b>${BOSS_HP}</b></span>
            <span>${difficultyLabel}</span>
          </div>
        </div>
      `;

      el.bossGrid.appendChild(card);
    });
  }

  /* ============================================================
     BATALHA
     ============================================================ */

  function buildDeck(boss) {
    const pool = QUESTIONS.filter((question) => boss.diff.includes(question.d));
    return shuffle(pool).slice(0, Math.min(20, pool.length));
  }

  function startBattle(bossIndex) {
    const boss = BOSSES[bossIndex];
    if (!boss) return;

    state.isPaused = false;
    state.returnTo = "menu";
    state.player.hp = state.player.maxHp;
    state.player.mp = state.player.maxMp;
    el.pauseOverlay.classList.add("hidden");

    state.battle = {
      bossIndex,
      boss,
      bossHp: BOSS_HP,
      bossMaxHp: BOSS_HP,
      playerHp: state.player.hp,
      deck: buildDeck(boss),
      pool: QUESTIONS.filter((question) => boss.diff.includes(question.d)),
      questionNumber: 0,
      currentQuestion: null,
      locked: false,
      over: false,
      timer: null,
      onTimeout: null,
      pending: false,
    };

    el.battleScreen.style.setProperty("--boss-accent", boss.accent);
    el.battleScreen.style.setProperty("--boss-glow", boss.glow);
    el.bossName.textContent = boss.name;
    el.bossLv.textContent = `Lv. ${boss.level}`;
    el.bossImg.src = boss.img;
    el.bossImg.alt = boss.name;
    el.bossTaunt.textContent = boss.taunt;
    el.battleProgress.textContent = `Chefe ${bossIndex + 1} / ${TOTAL_BOSSES}`;
    el.feedback.textContent = "";
    el.feedback.className = "feedback";

    updateBattleUI();
    showScreen("battle");
    setParticleColor(boss.accent);
    nextQuestion();
  }

  function updateBattleUI() {
    const battle = state.battle;
    if (!battle) return;

    const bossPercent = Math.max(0, Math.min(100, (battle.bossHp / battle.bossMaxHp) * 100));
    el.bossHpFill.style.width = `${bossPercent}%`;
    el.bossHpText.textContent = `${battle.bossHp} / ${battle.bossMaxHp}`;

    const playerPercent = Math.max(0, Math.min(100, (state.player.hp / state.player.maxHp) * 100));
    el.playerHpFill.style.width = `${playerPercent}%`;
    el.playerHpText.textContent = `${state.player.hp} / ${state.player.maxHp}`;
    el.playerHpFill.parentElement.classList.toggle("low", playerPercent <= 30);

    const mpPercent = Math.max(0, Math.min(100, (state.player.mp / state.player.maxMp) * 100));
    el.playerMpFill.style.width = `${mpPercent}%`;
    el.playerMpText.textContent = `${state.player.mp} / ${state.player.maxMp}`;

    el.playerLevel.textContent = `Lv. ${state.player.level}`;
    el.battleGold.textContent = state.player.gold;
    el.potionCount.textContent = `x${state.player.potions}`;
    el.potionBtn.disabled =
      state.player.potions <= 0 ||
      state.player.hp >= state.player.maxHp ||
      battle.locked ||
      battle.over ||
      state.isPaused;
  }

  function drawQuestion(question) {
    el.questionNumber.textContent = `Pergunta ${state.battle.questionNumber}`;
    el.questionDifficulty.textContent = DIFFICULTY_LABEL[question.d] || "Média";
    el.questionText.textContent = question.q;
    el.feedback.textContent = "";
    el.feedback.className = "feedback";

    el.answers.innerHTML = "";
    const options = shuffle(question.options);

    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.dataset.answer = option;

      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = LETTERS[index] || "?";

      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = option;

      button.appendChild(letter);
      button.appendChild(text);
      button.addEventListener("click", () => handleAnswer(option, button));
      el.answers.appendChild(button);
    });
  }

  function nextQuestion() {
    const battle = state.battle;
    if (!battle || battle.over) return;

    if (battle.deck.length === 0) {
      battle.deck = shuffle(battle.pool).slice(0, Math.min(20, battle.pool.length));
    }

    let question = battle.deck.pop();
    while (
      question &&
      battle.currentQuestion &&
      question.q === battle.currentQuestion.q &&
      battle.deck.length > 0
    ) {
      question = battle.deck.pop();
    }

    if (!question) {
      question = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    }

    battle.currentQuestion = question;
    battle.questionNumber += 1;
    battle.locked = false;
    drawQuestion(question);
    updateBattleUI();
  }

  function handleAnswer(selected, button) {
    const battle = state.battle;
    if (!battle || battle.over || battle.locked || state.isPaused) return;

    battle.locked = true;
    const question = battle.currentQuestion;
    const buttons = Array.from(el.answers.querySelectorAll(".answer"));
    buttons.forEach((answerButton) => {
      answerButton.disabled = true;
    });

    const isCorrect = selected === question.answer;

    if (isCorrect) {
      button.classList.add("correct");
      buttons.forEach((other) => {
        if (other !== button) other.classList.add("dimmed");
      });

      battle.bossHp = Math.max(0, battle.bossHp - HIT_DAMAGE);
      animateDamage(el.bossDamageLayer, `-${HIT_DAMAGE}`, "");
      shake(el.bossFrame);
      updateBattleUI();
      sfx.correct();

      if (battle.bossHp <= 0) {
        el.feedback.textContent = "Acerto final! O chefe foi derrotado.";
        el.feedback.className = "feedback good";
        scheduleAction(handleVictory, 1350);
      } else {
        el.feedback.textContent = `Acertou! O chefe sofre ${HIT_DAMAGE} de dano.`;
        el.feedback.className = "feedback good";
        scheduleAction(nextQuestion, 1250);
      }
      return;
    }

    button.classList.add("wrong");
    const correctButton = buttons.find((answerButton) => answerButton.dataset.answer === question.answer);
    if (correctButton) correctButton.classList.add("correct");
    buttons.forEach((other) => {
      if (other !== button && other !== correctButton) other.classList.add("dimmed");
    });

    const damage = 20 + battle.bossIndex * 3;
    battle.playerHp = Math.max(0, battle.playerHp - damage);
    state.player.hp = battle.playerHp;
    animateDamage(el.playerDamageLayer, `-${damage}`, "player-dmg");
    shake(el.playerAvatar);
    updateBattleUI();
    sfx.wrong();

    if (battle.playerHp <= 0) {
      el.feedback.textContent = "Seu HP chegou a zero...";
      el.feedback.className = "feedback bad";
      scheduleAction(handleDefeat, 1450);
    } else {
      el.feedback.textContent = `Resposta errada! O chefe contra-ataca e você perde ${damage} de HP.`;
      el.feedback.className = "feedback bad";
      scheduleAction(nextQuestion, 1650);
    }
  }

  function scheduleAction(action, delay) {
    const battle = state.battle;
    if (!battle) return;
    if (battle.timer) window.clearTimeout(battle.timer);
    battle.onTimeout = action;
    battle.pending = false;
    battle.timer = window.setTimeout(() => {
      battle.timer = null;
      if (state.isPaused) {
        battle.pending = true;
        return;
      }
      const nextAction = battle.onTimeout;
      battle.onTimeout = null;
      if (nextAction) nextAction();
    }, delay);
  }

  function usePotion() {
    const battle = state.battle;
    if (!battle || battle.over || battle.locked || state.isPaused) return;

    if (state.player.potions <= 0) {
      showToast("Você não tem poções.");
      return;
    }
    if (state.player.hp >= state.player.maxHp) {
      showToast("Sua vida já está cheia.");
      return;
    }

    const heal = Math.max(1, Math.round(state.player.maxHp * 0.4));
    const healed = Math.min(heal, state.player.maxHp - state.player.hp);
    state.player.potions -= 1;
    state.player.hp += healed;
    battle.playerHp = state.player.hp;

    animateDamage(el.playerDamageLayer, `+${healed}`, "heal");
    updateBattleUI();
    sfx.heal();
    el.feedback.textContent = `Você usou uma poção e recuperou ${healed} de HP.`;
    el.feedback.className = "feedback good";
  }

  function handleVictory() {
    const battle = state.battle;
    if (!battle || battle.over) return;

    battle.over = true;
    if (battle.timer) {
      window.clearTimeout(battle.timer);
      battle.timer = null;
    }

    const boss = battle.boss;
    const isFinalBoss = battle.bossIndex === TOTAL_BOSSES - 1;

    state.player.gold += boss.gold;
    state.player.exp += boss.exp;
    state.player.potions += 1;
    state.player.level += 1;
    state.player.maxHp += 15;
    state.player.maxMp += 5;
    state.player.hp = state.player.maxHp;
    state.player.mp = state.player.maxMp;

    if (isFinalBoss) {
      state.progress.defeated = TOTAL_BOSSES;
      state.progress.completed = true;
    } else {
      state.progress.defeated = Math.max(state.progress.defeated, battle.bossIndex + 1);
      state.progress.completed = false;
    }

    saveGame();

    el.rewardGold.textContent = `+${boss.gold}`;
    el.rewardExp.textContent = `+${boss.exp}`;
    el.rewardItem.textContent = "Poção de Cura Avançada";
    el.victoryLevelUp.classList.remove("hidden");
    el.victoryNewLevel.textContent = state.player.level;

    state.battle = null;
    state.isPaused = false;
    setParticleColor("#e8c874");
    showScreen("victory");
    sfx.victory();
  }

  function handleDefeat() {
    const battle = state.battle;
    if (!battle || battle.over) return;

    battle.over = true;
    if (battle.timer) {
      window.clearTimeout(battle.timer);
      battle.timer = null;
    }

    state.defeatBossIndex = battle.bossIndex;
    el.defeatBoss.textContent = battle.boss.name;
    state.player.hp = state.player.maxHp;
    state.player.mp = state.player.maxMp;
    saveGame();

    state.battle = null;
    state.isPaused = false;
    setParticleColor("#e05252");
    showScreen("defeat");
    sfx.defeat();
  }

  function animateDamage(layer, text, extraClass) {
    if (!layer) return;
    const number = document.createElement("span");
    number.className = `damage-number ${extraClass || ""}`.trim();
    number.textContent = text;
    number.style.left = `${28 + Math.random() * 44}%`;
    layer.appendChild(number);
    window.setTimeout(() => number.remove(), 1150);
  }

  function shake(element) {
    if (!element) return;
    element.classList.remove("hit");
    void element.offsetWidth;
    element.classList.add("hit");
    window.setTimeout(() => element.classList.remove("hit"), 470);
  }

  /* ============================================================
     PAUSE
     ============================================================ */

  function openPause() {
    const battle = state.battle;
    if (!battle || battle.over || state.isPaused) return;

    state.isPaused = true;
    if (battle.timer) {
      window.clearTimeout(battle.timer);
      battle.timer = null;
      battle.pending = true;
    }
    el.pauseBossName.textContent = battle.boss.name;
    el.pauseOverlay.classList.remove("hidden");
    updateBattleUI();
  }

  function resumeBattle() {
    if (!state.battle) {
      el.pauseOverlay.classList.add("hidden");
      return;
    }
    el.pauseOverlay.classList.add("hidden");
    state.isPaused = false;
    updateBattleUI();

    const battle = state.battle;
    if (battle && battle.pending) {
      battle.pending = false;
      if (battle.onTimeout) {
        battle.timer = window.setTimeout(() => {
          battle.timer = null;
          if (state.isPaused) {
            battle.pending = true;
            return;
          }
          const action = battle.onTimeout;
          battle.onTimeout = null;
          if (action) action();
        }, 180);
      }
    }
  }

  /* ============================================================
     CONCLUSÃO
     ============================================================ */

  function showCompletion() {
    el.completionBosses.innerHTML = "";
    BOSSES.forEach((boss) => {
      const image = document.createElement("img");
      image.src = boss.img;
      image.alt = boss.name;
      el.completionBosses.appendChild(image);
    });
    el.completionLevel.textContent = state.player.level;
    el.completionGold.textContent = state.player.gold;
    state.progress.defeated = TOTAL_BOSSES;
    state.progress.completed = true;
    saveGame();
    setParticleColor("#e8c874");
    showScreen("completion");
    sfx.victory();
  }

  /* ============================================================
     FLUXO DE INÍCIO / CONTINUAÇÃO
     ============================================================ */

  function continueGame() {
    if (state.progress.completed) {
      showCompletion();
      return;
    }
    if (state.progress.defeated >= TOTAL_BOSSES) {
      showCompletion();
      return;
    }
    showScreen("select");
  }

  function requestNewGame() {
    if (hasProgress()) {
      const confirmed = window.confirm("Iniciar um novo jogo apagará o progresso atual. Deseja continuar?");
      if (!confirmed) return;
    }
    resetProgress(false);
    showToast("Novo jogo iniciado. Boa sorte, herói!");
    showScreen("select");
  }

  /* ============================================================
     EVENTOS
     ============================================================ */

  function handleAction(action) {
    switch (action) {
      case "continue":
        continueGame();
        break;
      case "new-game":
        requestNewGame();
        break;
      case "instructions":
        openInfo("instructions");
        break;
      case "settings":
        openInfo("settings");
        break;
      case "back":
        goBack();
        break;
      case "back-menu":
        goToMenuFromSelect();
        break;
      case "resume":
        resumeBattle();
        break;
      case "quit-menu":
        quitBattleToMenu();
        break;
      case "exit":
        attemptExit();
        break;
      case "finish":
        state.returnTo = "menu";
        saveGame();
        showScreen("menu");
        break;
      default:
        break;
    }
  }

  function wireEvents() {
    document.addEventListener("click", (event) => {
      const actionButton = event.target.closest("[data-action]");
      if (actionButton) {
        const action = actionButton.dataset.action;
        if (actionButton.disabled) return;
        if (!actionButton.classList.contains("answer")) sfx.click();
        handleAction(action);
        return;
      }

      const plainButton = event.target.closest("button");
      if (plainButton && !plainButton.disabled && !plainButton.classList.contains("answer")) {
        sfx.click();
      }
    });

    $("btn-pause").addEventListener("click", openPause);
    $("btn-potion").addEventListener("click", usePotion);

    $("btn-victory-next").addEventListener("click", () => {
      if (state.progress.completed) {
        showCompletion();
      } else {
        showScreen("select");
      }
    });

    $("btn-retry").addEventListener("click", () => {
      startBattle(state.defeatBossIndex);
    });

    el.btnContinue.addEventListener("click", continueGame);
    el.btnNewGame.addEventListener("click", requestNewGame);

    el.bossGrid.addEventListener("click", (event) => {
      const card = event.target.closest(".boss-card");
      if (!card) return;
      const index = Number.parseInt(card.dataset.boss, 10);
      if (Number.isNaN(index)) return;

      if (state.progress.completed || index < state.progress.defeated) {
        showToast("Este chefe já foi derrotado.");
        return;
      }
      if (index > state.progress.defeated) {
        showToast("Derrote o chefe anterior para liberar este desafio.");
        return;
      }
      if (state.progress.defeated >= TOTAL_BOSSES) {
        showToast("Todos os chefes já foram derrotados.");
        return;
      }
      startBattle(index);
    });

    el.setSfx.addEventListener("change", () => {
      state.settings.sfx = el.setSfx.checked;
      saveGame();
      if (state.settings.sfx) sfx.click();
    });

    el.setMotion.addEventListener("change", () => {
      state.settings.reduceMotion = el.setMotion.checked;
      saveGame();
      applySettings();
    });

    $("btn-reset-progress").addEventListener("click", () => {
      const confirmed = window.confirm("Apagar todo o progresso? Esta ação não pode ser desfeita.");
      if (!confirmed) return;
      resetProgress(true);
      state.returnTo = "menu";
      showScreen("menu");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const pauseVisible = !el.pauseOverlay.classList.contains("hidden");
      if (pauseVisible) {
        event.preventDefault();
        resumeBattle();
        return;
      }
      if (state.screen === "battle" && state.battle && !state.battle.over) {
        event.preventDefault();
        openPause();
        return;
      }
      if (state.screen === "instructions" || state.screen === "settings") {
        event.preventDefault();
        goBack();
      }
    });

    window.addEventListener("resize", () => {
      resizeCanvas();
      if (state.settings.reduceMotion) {
        if (particleCtx) particleCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      } else {
        startParticles();
      }
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && state.screen === "battle" && state.battle && !state.battle.over && !state.isPaused) {
        openPause();
      }
    });
  }

  /* ============================================================
     INICIALIZAÇÃO
     ============================================================ */

  function init() {
    loadGame();
    syncSettingsUI();
    resizeCanvas();
    startParticles();
    startHeroCycle();
    updateContinueVisibility();
    renderBossGrid();
    showScreen("menu");
    wireEvents();
  }

  init();
})();
