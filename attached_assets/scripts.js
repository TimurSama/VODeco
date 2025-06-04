document.addEventListener('DOMContentLoaded', () => {
    const globeContainer = document.getElementById('globe');
    const hexagonContainer = document.querySelector('.hexagon-container');
    const hexagons = document.querySelectorAll('.hexagon');
    const infoPanel = document.getElementById('info-panel');
    const infoTitle = document.getElementById('info-title');
    const closeInfoBtn = document.getElementById('close-info');
    const infoTabs = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    let scene, camera, renderer, globe;
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    // --- Content Data (Placeholder - Needs to be populated from analyzed docs) ---
    const contentData = {
        government: {
            title: "Государство",
            problems: "<ul><li>Фальсификация данных мониторинга</li><li>Проблемы управления трансграничными водами</li><li>Отсутствие единой системы мониторинга</li><li>Коррупционные риски в распределении ресурсов</li><li>Неэффективное законодательство</li></ul>",
            solutions: "<ul><li>Блокчейн для прозрачности данных</li><li>Международные соглашения на базе DAO</li><li>IoT-мониторинг в реальном времени</li><li>Смарт-контракты для распределения</li><li>Децентрализованное управление (DAO)</li></ul>",
            benefits: "<ul><li>Повышение доверия граждан</li><li>Снижение коррупции</li><li>Эффективное управление ресурсами</li><li>Улучшение международных отношений</li><li>Прозрачность принятия решений</li></ul>",
            functions: "<ul><li>Верификация данных через блокчейн</li><li>Платформа для межгосударственного взаимодействия</li><li>Инструменты для общественного контроля</li><li>Автоматизация отчетности</li><li>Аналитика для принятия решений</li></ul>"
        },
        science: {
            title: "Научное сообщество",
            problems: "<ul><li>Недостаток данных для исследований</li><li>Сложность доступа к актуальной информации</li><li>Фрагментация исследований</li><li>Трудности внедрения разработок</li><li>Нехватка финансирования</li></ul>",
            solutions: "<ul><li>Единая база данных VODECO</li><li>Открытый доступ к данным мониторинга</li><li>Платформа для совместных исследований</li><li>Интеграция науки и практики через DAO</li><li>Краудфандинг исследований через токены</li></ul>",
            benefits: "<ul><li>Ускорение научных открытий</li><li>Повышение качества исследований</li><li>Синергия между учеными</li><li>Быстрое внедрение инноваций</li><li>Привлечение инвестиций в науку</li></ul>",
            functions: "<ul><li>Хранилище верифицированных данных</li><li>Инструменты анализа и визуализации</li><li>Площадка для публикации исследований</li><li>Механизмы грантов и финансирования</li><li>Инструменты для коллаборации</li></ul>"
        },
        'water-objects': {
            title: "Объекты водохозяйственного комплекса",
            problems: "<ul><li>Износ инфраструктуры</li><li>Низкая эффективность очистки</li><li>Потери воды при транспортировке</li><li>Отсутствие автоматизации</li><li>Сложность мониторинга состояния</li></ul>",
            solutions: "<ul><li>Модернизация с привлечением инвестиций DAO</li><li>Внедрение современных технологий очистки</li><li>Цифровые двойники объектов</li><li>Автоматизация управления (SCADA на блокчейне)</li><li>Постоянный мониторинг через IoT</li></ul>",
            benefits: "<ul><li>Снижение затрат на эксплуатацию</li><li>Повышение качества воды</li><li>Уменьшение потерь ресурсов</li><li>Оптимизация работы объектов</li><li>Продление срока службы инфраструктуры</li></ul>",
            functions: "<ul><li>Инвестиционная платформа для модернизации</li><li>База данных технологий и подрядчиков</li><li>Система предиктивного обслуживания</li><li>Инструменты для цифрового моделирования</li><li>Мониторинг эффективности в реальном времени</li></ul>"
        },
        users: {
            title: "Водопользователи",
            problems: "<ul><li>Непрозрачное тарифообразование</li><li>Низкое качество воды</li><li>Отсутствие информации о состоянии воды</li><li>Сложность влияния на управление</li><li>Недостаток инструментов экономии</li></ul>",
            solutions: "<ul><li>Прозрачный учет потребления на блокчейне</li><li>Общественный мониторинг качества воды</li><li>Доступ к данным через приложение VODECO</li><li>Участие в DAO для принятия решений</li><li>Рекомендации по экономии на основе ИИ</li></ul>",
            benefits: "<ul><li>Справедливые тарифы</li><li>Гарантия качества воды</li><li>Осознанное потребление</li><li>Возможность влиять на систему</li><li>Экономия личных средств</li></ul>",
            functions: "<ul><li>Личный кабинет с данными потребления</li><li>Карта качества воды</li><li>Инструменты голосования в DAO</li><li>Система оповещений и рекомендаций</li><li>Маркетплейс водосберегающих технологий</li></ul>"
        },
        investors: {
            title: "Инвесторы",
            problems: "<ul><li>Высокие риски инвестиций в инфраструктуру</li><li>Непрозрачность проектов</li><li>Сложность оценки эффективности</li><li>Длительные сроки окупаемости</li><li>Отсутствие ликвидных инструментов</li></ul>",
            solutions: "<ul><li>Децентрализованное финансирование через DAO</li><li>Прозрачность проектов на блокчейне</li><li>Мониторинг KPI через смарт-контракты</li><li>Токенизация активов (доходные токены VOD)</li><li>Вторичный рынок токенов</li></ul>",
            benefits: "<ul><li>Снижение рисков</li><li>Прозрачность и контроль</li><li>Объективная оценка доходности</li><li>Повышение ликвидности инвестиций</li><li>Участие в социально значимых проектах</li></ul>",
            functions: "<ul><li>Инвестиционная платформа VODECO</li><li>Инструменты анализа проектов</li><li>Смарт-контракты для управления инвестициями</li><li>Кошелек для токенов VOD</li><li>Отчетность по проектам в реальном времени</li></ul>"
        },
        contractors: {
            title: "Подрядчики и Технологии",
            problems: "<ul><li>Сложность выхода на рынок</li><li>Непрозрачные тендеры</li><li>Трудности демонстрации эффективности</li><li>Недостаток информации о потребностях</li><li>Сложность привлечения финансирования</li></ul>",
            solutions: "<ul><li>Открытая платформа VODECO для подрядчиков</li><li>Прозрачные тендеры на блокчейне</li><li>Верификация эффективности технологий через IoT</li><li>Доступ к базе данных проектов и потребностей</li><li>Интеграция с инвестиционной платформой</li></ul>",
            benefits: "<ul><li>Равный доступ к заказам</li><li>Честная конкуренция</li><li>Подтверждение репутации и качества</li><li>Доступ к новым рынкам</li><li>Возможности для роста и развития</li></ul>",
            functions: "<ul><li>Реестр подрядчиков и технологий</li><li>Платформа для проведения тендеров</li><li>Система рейтинга и отзывов</li><li>Инструменты для демонстрации кейсов</li><li>Аналитика рынка и потребностей</li></ul>"
        }
    };

    // --- Initialize Three.js Globe ---
    function initGlobe() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        globeContainer.appendChild(renderer.domElement);

        // Basic Globe Geometry & Material
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'), // Placeholder texture
            bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_bumpmap.jpg'), // Placeholder bump map
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_specularmap.jpg'), // Placeholder specular map
            specular: new THREE.Color('grey'),
            shininess: 10
        });
        globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        camera.position.z = 10;

        animate();
        setupGlobeInteraction();
    }

    function animate() {
        requestAnimationFrame(animate);
        // Add subtle rotation if not dragging
        if (!isDragging) {
             globe.rotation.y += 0.0005;
        }
        renderer.render(scene, camera);
    }

    function setupGlobeInteraction() {
        globeContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
            globeContainer.style.cursor = 'grabbing';
        });

        globeContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };

            const rotateQuaternion = new THREE.Quaternion()
                .setFromEuler(new THREE.Euler(
                    toRadians(deltaMove.y * 0.5),
                    toRadians(deltaMove.x * 0.5),
                    0,
                    'XYZ'
                ));
            globe.quaternion.multiplyQuaternions(rotateQuaternion, globe.quaternion);

            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });

        globeContainer.addEventListener('mouseup', () => {
            isDragging = false;
            globeContainer.style.cursor = 'grab';
        });
         globeContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            globeContainer.style.cursor = 'grab';
        });

        // Add wheel event for zooming
        globeContainer.addEventListener('wheel', (e) => {
            const zoomSpeed = 0.1;
            camera.position.z += e.deltaY * zoomSpeed;
            // Clamp zoom level
            camera.position.z = Math.max(7, Math.min(20, camera.position.z)); 
        });
    }

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    // --- Hexagon Layout ---
    function layoutHexagons() {
        const radius = Math.min(hexagonContainer.clientWidth, hexagonContainer.clientHeight) * 0.35; // Adjust radius
        const angleStep = (2 * Math.PI) / hexagons.length;

        hexagons.forEach((hex, index) => {
            const angle = angleStep * index - Math.PI / 2; // Start from top
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            hex.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`; // Center the hexagon
        });
    }

    // --- Interactions ---
    hexagons.forEach(hex => {
        hex.addEventListener('click', () => {
            const type = hex.dataset.type;
            const content = contentData[type];

            if (!content) return;

            // Update panel title
            infoTitle.textContent = content.title;

            // Update tab content
            document.getElementById('problems').innerHTML = content.problems || '<p>Информация отсутствует.</p>';
            document.getElementById('solutions').innerHTML = content.solutions || '<p>Информация отсутствует.</p>';
            document.getElementById('benefits').innerHTML = content.benefits || '<p>Информация отсутствует.</p>';
            document.getElementById('functions').innerHTML = content.functions || '<p>Информация отсутствует.</p>';

            // Reset and set active tab
            infoTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            infoTabs[0].classList.add('active');
            tabContents[0].classList.add('active');

            // Show panel
            infoPanel.classList.add('visible');

            // Update hexagon states
            hexagons.forEach(h => {
                if (h === hex) {
                    h.classList.add('active');
                    h.classList.remove('inactive');
                } else {
                    h.classList.add('inactive');
                    h.classList.remove('active');
                }
            });

            // Animate panel (using GSAP if available, otherwise CSS transition)
            if (window.gsap) {
                gsap.to(infoPanel, { right: 0, duration: 0.5, ease: 'power2.out' });
            } else {
                infoPanel.style.right = '0'; // Fallback to CSS transition
            }
        });
    });

    closeInfoBtn.addEventListener('click', () => {
        // Hide panel
        infoPanel.classList.remove('visible');

        // Reset hexagon states
        hexagons.forEach(h => {
            h.classList.remove('active', 'inactive');
        });

        // Animate panel out
        if (window.gsap) {
            gsap.to(infoPanel, { right: '-500px', duration: 0.5, ease: 'power2.in' });
        } else {
             // Adjust based on CSS definition for hidden state
             if (window.innerWidth <= 768) {
                 infoPanel.style.bottom = '-100%'; 
             } else {
                 infoPanel.style.right = '-500px';
             }
        }
    });

    infoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            infoTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- Responsive Adjustments ---
    function onWindowResize() {
        if (camera && renderer) {
            camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        }
        layoutHexagons();
    }

    window.addEventListener('resize', onWindowResize);

    // --- Initial Setup ---
    if (globeContainer) {
        initGlobe();
    }
    layoutHexagons();
});

