const sideLinks = document.querySelectorAll('.menu .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});
const menuBar = document.querySelector('.conteudo nav .bx.bx-menu');
const Menu = document.querySelector('.menu');

menuBar.addEventListener('click', () => {
    Menu.classList.toggle('close');
});
const searchBtn = document.querySelector('.conteudo nav form .form-input button');
const searchBtnIcon = document.querySelector('.conteudo nav form .form-input button .bx');
const searchForm = document.querySelector('.conteudo nav form');


searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        Menu.classList.add('close');
    } else {
        Menu.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});
const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});
let slideIndex = 0;
const slides = document.querySelectorAll('.carrossel > div');
const totalSlides = slides.length;

function showSlide(index) {
    const carrossel = document.querySelector('.carrossel');
    carrossel.style.transform = `translateX(${-index * 100}%)`;
}

// Inicializa a exibição do primeiro slide
showSlide(slideIndex);

function changeSlide(n) {
    slideIndex = (slideIndex + n + totalSlides) % totalSlides;
    showSlide(slideIndex);
}

// Eventos dos botões de navegação
document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

function autoSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    showSlide(slideIndex);
}

setInterval(autoSlide, 3000); 
//Quiz - script
document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        "Quem foi o primeiro piloto da Mahindra Racing a vencer uma corrida na Fórmula E?",
        "Em que temporada a Mahindra Racing estreou na Fórmula E?",
        "Qual piloto da Mahindra Racing conquistou a primeira pole position da equipe na Fórmula E?",
        "Quantas vitórias a Mahindra Racing conquistou na Fórmula E até agora?",
        "Em que temporada a Mahindra Racing alcançou seu melhor resultado no campeonato de equipes da Fórmula E?",
        "Qual piloto conquistou mais pódios para a Mahindra Racing na Fórmula E?",
        "Qual foi a primeira corrida da Fórmula E em que a Mahindra Racing competiu?",
        "Qual é o nome do patrocinador principal da Mahindra Racing na Fórmula E?",
        "Qual foi a posição final de Pascal Wehrlein no campeonato de pilotos da Fórmula E na temporada 2018-2019?",
        "Em que cidade a Mahindra Racing conquistou sua primeira vitória na Fórmula E?"
    ];

    const answers = [
        ["Nick Heidfeld", "Felix Rosenqvist", "Jérôme d'Ambrosio", "Pascal Wehrlein"],
        ["Temporada 1 (2014-2015)", "Temporada 2 (2015-2016)", "Temporada 3 (2016-2017)", "Temporada 4 (2017-2018)"],
        ["Nick Heidfeld", "Felix Rosenqvist", "Jérôme d'Ambrosio", "Pascal Wehrlein"],
        ["3", "4", "5", "6"],
        ["Temporada 3 (2016-2017)", "Temporada 4 (2017-2018)", "Temporada 5 (2018-2019)", "Temporada 6 (2019-2020)"],
        ["Nick Heidfeld", "Felix Rosenqvist", "Jérôme d'Ambrosio", "Pascal Wehrlein"],
        ["Beijing ePrix", "Buenos Aires ePrix", "Miami ePrix", "London ePrix"],
        ["ABB", "Qualcomm", "Enel", "Julius Baer"],
        ["2ª posição", "3ª posição", "4ª posição", "5ª posição"],
        ["Berlim", "Paris", "Marrakesh", "Hong Kong"]
    ];

    const correctAnswers = [1, 0, 2, 2, 2, 1, 0, 0, 0, 2];

    let currentQuestion = 0;
    let correct = 0;
    let incorrect = 0;

    const questionElement = document.getElementById('question');
    const numeroElement = document.getElementById('numero');
    const optionButtons = [
        document.getElementById('0'),
        document.getElementById('1'),
        document.getElementById('2'),
        document.getElementById('3')
    ];

    function displayQuestion() {
        questionElement.textContent = questions[currentQuestion];
        numeroElement.textContent = `#${currentQuestion + 1}`; 
        optionButtons.forEach((button, index) => {
            button.textContent = answers[currentQuestion][index];
        });
    }

    displayQuestion(); // Exibe a primeira pergunta assim que a página carrega

    optionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === correctAnswers[currentQuestion]) {
                correct++;
            } else {
                incorrect++;
            }

            currentQuestion++;

            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                alert(`Quiz concluído! Acertos: ${correct}, Erros: ${incorrect}`);
            }

            updateChart();
        });
    });

    // Gráfico de progresso
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Acertos', 'Erros', 'Progresso'],
            datasets: [{
                label: 'Seu progresso!',
                data: [0, 0, 0],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: questions.length
                }
            }
        }
    });

    function updateChart() {
        progressChart.data.datasets[0].data[0] = correct;
        progressChart.data.datasets[0].data[1] = incorrect;
        progressChart.data.datasets[0].data[2] = currentQuestion;
        progressChart.update();
    }

    updateChart(); // Inicializa o gráfico
});


// Pilotos modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Fecha o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
// ======= Audiodescrição =======
let isAudiodescriptionEnabled = false;
const toggleButton = document.getElementById('toggle-audiodescription');

toggleButton.addEventListener('click', () => {
    isAudiodescriptionEnabled = !isAudiodescriptionEnabled;
    toggleButton.textContent = isAudiodescriptionEnabled ? 'Desativar Audiodescrição' : 'Ativar Audiodescrição';
});

// Função para falar o texto
function speakText(text) {
    if (isAudiodescriptionEnabled) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'pt-BR';
        window.speechSynthesis.speak(speech);
    }
}

// Função para parar de falar o texto
function stopSpeaking() {
    window.speechSynthesis.cancel(); // Interrompe a fala atual
}

// Adiciona eventos de mouseover e mouseout em elementos de texto e quiz
const textElements = document.querySelectorAll('p, h1, h2, h3, li, span'); // Seleciona os elementos de texto
const quizOptions = document.querySelectorAll('.options button'); // Seleciona os botões do quiz

textElements.forEach((element) => {
    element.addEventListener('mouseenter', () => speakText(element.textContent)); // Inicia a leitura
    element.addEventListener('mouseleave', stopSpeaking); // Interrompe a leitura ao sair do elemento
});

// Adiciona eventos para as opções do quiz
quizOptions.forEach((option) => {
    option.addEventListener('mouseenter', () => speakText(option.textContent)); // Inicia a leitura ao passar o mouse nas opções
    option.addEventListener('mouseleave', stopSpeaking); // Interrompe a leitura ao sair da opção
});
// tradução

const translations = {
    en: {
        logo: "Formula ",
        inicio: "Home",
        corridas: "Races",
        quiz: "Quiz",
        calendario: "Calendar",
        pilotos: "Drivers",
        noticias: "News",
        parcerias: "Partnerships",
        contato: "Contact",
        sair: "Logout",
        pesquisar: "Search...",
        toggleAudiodescription: "Activate Audiodescription",
        compartilhar: "Share",
        problema: "Identified Problem",
        problemaText: [
            "The popularization of Mahindra in Formula E faces challenges such as competing with established teams,",
            "consolidating its brand, attracting sponsors, and expanding its fan base. Investments in technology",
            "and talent development are essential to maintain competitiveness. Success requires a comprehensive",
            "strategic approach, including marketing, partnerships, and focus on innovation."
        ],
        solucao: "Solution",
        solucaoText: [
            "The solution is an interactive and gamified site dedicated to Formula E, offering an immersive experience",
            "with information on circuits, statistics, rankings, and virtual car tours.",
            "The platform will be easy to use and accessible on different devices.",
            "Features like interactive quizzes on Formula E history, drivers, and teams,",
            "multiple difficulty levels, and local and global rankings with rewards will engage users.",
            "Social and interactive elements, such as real-time quizzes during races and sharing options",
            "on social media, will increase visibility and engagement. This approach aims to attract",
            "new audiences, educate on the benefits of electric cars, and strengthen Mahindra Racing's position in Formula E."
        ],
        curiosidades: "Facts about Formula E",
        curiosidadesText: [
            "Formula E is the first all-electric car racing competition in the world.",
            "The championship was inaugurated in 2014 by the FIA.",
            "Formula E races are held on urban circuits in various cities around the world.",
            "Formula E cars reach speeds of up to 280 km/h.",
            "The Formula E car battery lasts for an entire race, eliminating the need for swaps during the race."
        ],
        chamada: "Call to Action",
        chamadaText: "Explore our site to get the latest news, race information, driver profiles, and more. Test your knowledge with our exclusive quizzes and see how much you know about the world's most exciting electric car racing competition. Don’t miss any news! Sign up for our newsletter to receive regular updates directly in your inbox. Join us and be part of this green speed revolution!",
        inscricaoNewsletter: "Sign Up for the Newsletter",
        proximasCorridas: "Upcoming Races",
        insights: [
            "Players Online",
            "Your Score",
            "Your Drops",
            "Ranking"
        ],
        quizQuestion: "Which team won the pole position in the last Formula E race?",
        submitButton: "Submit",
        quizOptions: [
            "Audi Sport ABT",
            "Nissan e.dams",
            "Mercedes-EQ Formula E Team",
            "Envision Virgin Racing"
        ]
    },
    pt: {
        logo: "Fórmula ",
        inicio: "Início",
        corridas: "Corridas",
        quiz: "Quiz",
        calendario: "Calendário",
        pilotos: "Pilotos",
        noticias: "Notícias",
        parcerias: "Parcerias",
        contato: "Contato",
        sair: "Sair",
        pesquisar: "Pesquisar...",
        toggleAudiodescription: "Ativar Audiodescrição",
        compartilhar: "Compartilhar",
        problema: "Problema Identificado",
        problemaText: [
            "A popularização da Mahindra na Fórmula E enfrenta desafios como competir com equipes estabelecidas,",
            "consolidar sua marca, atrair patrocinadores e expandir sua base de fãs. Investimentos em tecnologia",
            "e desenvolvimento de talentos são essenciais para manter a competitividade. O sucesso requer uma abordagem",
            "estratégica abrangente, incluindo marketing, parcerias e foco na inovação."
        ],
        solucao: "Solução",
        solucaoText: [
            "A solução é um site interativo e gamificado dedicado à Fórmula E, que oferece uma experiência imersiva",
            "com informações sobre circuitos, estatísticas, classificações e passeios virtuais dos carros.",
            "A plataforma será fácil de usar e acessível em diferentes dispositivos.",
            "Recursos como quizzes interativos sobre a história da Fórmula E, pilotos e equipes,",
            "múltiplos níveis de dificuldade, e rankings locais e globais com recompensas irão engajar os usuários.",
            "Elementos sociais e interativos, como quizzes em tempo real durante as corridas e opções de compartilhamento",
            "de resultados nas redes sociais, aumentarão a visibilidade e o engajamento. Esta abordagem visa atrair",
            "novos públicos, educar sobre os benefícios dos carros elétricos e fortalecer a posição da Mahindra Racing na Fórmula E."
        ],
        curiosidades: "Curiosidades sobre a Fórmula E",
        curiosidadesText: [
            "A Fórmula E é a primeira competição de carros de corrida totalmente elétricos do mundo.",
            "O campeonato foi inaugurado em 2014 pela Federação Internacional de Automobilismo (FIA).",
            "As corridas da Fórmula E são disputadas em circuitos urbanos em várias cidades ao redor do mundo.",
            "Os carros da Fórmula E atingem velocidades de até 280 km/h.",
            "A bateria dos carros de Fórmula E é capaz de durar uma corrida inteira, eliminando a necessidade de trocas durante a prova."
        ],
        chamada: "Chamada para Ação",
        chamadaText: "Explore nosso site para obter as últimas notícias, informações sobre corridas, perfis de pilotos e muito mais. Teste seus conhecimentos com nossos quizzes exclusivos e veja o quanto você sabe sobre a competição de corrida de carros elétricos mais empolgante do mundo. Não perca nenhuma novidade! Inscreva-se em nossa newsletter para receber atualizações regulares diretamente na sua caixa de entrada. Junte-se a nós e faça parte dessa revolução verde da velocidade!",
        inscricaoNewsletter: "Inscrever-se na Newsletter",
        proximasCorridas: "Próximas Corridas",
        insights: [
            "Jogadores Online",
            "Sua Pontuação",
            "Suas Decaídas",
            "Ranking"
        ],
        quizQuestion: "Qual equipe conquistou a pole position na última corrida da Fórmula E?",
        submitButton: "Enviar",
        quizOptions: [
            "Audi Sport ABT",
            "Nissan e.dams",
            "Mercedes-EQ Formula E Team",
            "Envision Virgin Racing"
        ]
    },

    es: {
        logo: "Fórmula ",
        inicio: "Inicio",
        corridas: "Carreras",
        quiz: "Quiz",
        calendario: "Calendario",
        pilotos: "Pilotos",
        noticias: "Noticias",
        parcerias: "Asociaciones",
        contato: "Contacto",
        sair: "Salir",
        pesquisar: "Buscar...",
        toggleAudiodescription: "Activar Audiodescripción",
        compartilhar: "Compartir",
        problema: "Problema Identificado",
        problemaText: [
            "La popularización de Mahindra en Fórmula E enfrenta desafíos como competir con equipos establecidos,",
            "consolidar su marca, atraer patrocinadores y expandir su base de fans. Las inversiones en tecnología",
            "y el desarrollo de talento son esenciales para mantener la competitividad. El éxito requiere un enfoque",
            "estratégico integral, que incluya marketing, asociaciones y un enfoque en la innovación."
        ],
        solucao: "Solución",
        solucaoText: [
            "La solución es un sitio web interactivo y gamificado dedicado a Fórmula E, que ofrece una experiencia inmersiva",
            "con información sobre circuitos, estadísticas, clasificaciones y recorridos virtuales de los coches.",
            "La plataforma será fácil de usar y accesible en diferentes dispositivos.",
            "Características como quizzes interactivos sobre la historia de Fórmula E, pilotos y equipos,",
            "múltiples niveles de dificultad y clasificaciones locales y globales con recompensas involucrarán a los usuarios.",
            "Elementos sociales e interactivos, como quizzes en tiempo real durante las carreras y opciones de compartir",
            "resultados en redes sociales, aumentarán la visibilidad y el compromiso. Este enfoque tiene como objetivo atraer",
            "nuevas audiencias, educar sobre los beneficios de los coches eléctricos y fortalecer la posición de Mahindra Racing en Fórmula E."
        ],
        curiosidades: "Curiosidades sobre Fórmula E",
        curiosidadesText: [
            "Fórmula E es la primera competencia de coches de carreras totalmente eléctricos del mundo.",
            "El campeonato fue inaugurado en 2014 por la Federación Internacional del Automóvil (FIA).",
            "Las carreras de Fórmula E se disputan en circuitos urbanos en varias ciudades de todo el mundo.",
            "Los coches de Fórmula E alcanzan velocidades de hasta 280 km/h.",
            "La batería de los coches de Fórmula E puede durar toda una carrera, eliminando la necesidad de cambios durante la prueba."
        ],
        chamada: "Llamada a la Acción",
        chamadaText: "Explora nuestro sitio para obtener las últimas noticias, información sobre carreras, perfiles de pilotos y mucho más. Pon a prueba tus conocimientos con nuestros quizzes exclusivos y descubre cuánto sabes sobre la competencia de coches eléctricos más emocionante del mundo. ¡No te pierdas ninguna novedad! Suscríbete a nuestro boletín para recibir actualizaciones regulares directamente en tu bandeja de entrada. ¡Únete a nosotros y sé parte de esta revolución verde de la velocidad!",
        inscricaoNewsletter: "Suscribirse al Boletín",
        proximasCorridas: "Próximas Carreras",
        insights: [
            "Jugadores en Línea",
            "Tu Puntaje",
            "Tus Caídas",
            "Clasificación"
        ],
        quizQuestion: "¿Qué equipo logró la pole position en la última carrera de Fórmula E?",
        submitButton: "Enviar",
        quizOptions: [
            "Audi Sport ABT",
            "Nissan e.dams",
            "Mercedes-EQ Formula E Team",
            "Envision Virgin Racing"
        ]
    }
    
};
////////////////////////////////////////////////////////////////////////////////////////

// Função para mudar o idioma
function changeLanguage(language) {
    document.querySelector('.nome-logo span').textContent = translations[language].logo;

    document.querySelector('.side-menu li:nth-child(1) a').innerHTML = `<i class='bx bx-home'></i> ${translations[language].inicio}`;
    document.querySelector('.side-menu li:nth-child(2) a').innerHTML = `<i class='bx bxs-car-crash'></i> ${translations[language].corridas}`;
    document.querySelector('.side-menu li:nth-child(3) a').innerHTML = `<i class='bx bx-joystick-alt'></i> ${translations[language].quiz}`;
    document.querySelector('.side-menu li:nth-child(4) a').innerHTML = `<i class='bx bx-calendar'></i> ${translations[language].calendario}`;
    document.querySelector('.side-menu li:nth-child(5) a').innerHTML = `<i class='bx bxs-face-mask'></i> ${translations[language].pilotos}`;
    document.querySelector('.side-menu li:nth-child(6) a').innerHTML = `<i class='bx bx-news'></i> ${translations[language].noticias}`;
    document.querySelector('.side-menu li:nth-child(7) a').innerHTML = `<i class='bx bxs-user-account'></i> ${translations[language].parcerias}`;
    document.querySelector('.side-menu li:nth-child(8) a').innerHTML = `<i class='bx bx-phone'></i> ${translations[language].contato}`;

    document.querySelector('.search-btn').placeholder = translations[language].pesquisar;
    document.querySelector('.audiodescription-btn').textContent = translations[language].toggleAudiodescription;
    document.querySelector('.compartilhar span').textContent = translations[language].compartilhar;  

    // Seções de problema e solução
    document.querySelector('.problema h2').textContent = translations[language].problema;
    const problemaItems = document.querySelectorAll('.problema li');
    translations[language].problemaText.forEach((text, i) => {
        problemaItems[i].textContent = text;
    });

    document.querySelector('.solucao h2').textContent = translations[language].solucao;
    const solucaoItems = document.querySelectorAll('.solucao li');
    translations[language].solucaoText.forEach((text, i) => {
        solucaoItems[i].textContent = text;
    });

    // Curiosidades
    document.querySelector('.curiosidades h2').textContent = translations[language].curiosidades;
    const curiosidadesItems = document.querySelectorAll('.curiosidades li');
    translations[language].curiosidadesText.forEach((text, i) => {
        curiosidadesItems[i].textContent = text;
    });

    // Chamada para ação
    document.querySelector('.chamada h2').textContent = translations[language].chamada;
    document.querySelector('.chamada p').textContent = translations[language].chamadaText;
    document.querySelector('.chamada-btn').textContent = translations[language].inscricaoNewsletter;

    // Quiz
    document.getElementById('question').textContent = translations[language].quizQuestion;
    const quizOptions = document.querySelectorAll('.options button');
    translations[language].quizOptions.forEach((option, i) => {
        quizOptions[i].textContent = option;
    });

    // Insights
    const insights = document.querySelectorAll('.insights .info p');
    insights.forEach((item, index) => {
        item.textContent = translations[language].insights[index];
    });
}

// Função para detectar mudanças no seletor de idioma
document.getElementById('language-select').addEventListener('change', function() {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);  // Chama a função para mudar o idioma
});

// Inicializa a página com o idioma padrão
changeLanguage('pt');
