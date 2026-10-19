<div align="center">

# PH Company

**Sites que fazem a sua marca ser vista.**

Site institucional da PH Company, criada por Pedro &amp; Heitor para ajudar pequenos e grandes negócios a ganharem visibilidade na internet.

![React](https://img.shields.io/badge/React-18-111?style=flat-square&logo=react&logoColor=C9A227)
![Vite](https://img.shields.io/badge/Vite-5-111?style=flat-square&logo=vite&logoColor=C9A227)
![Three.js](https://img.shields.io/badge/Three.js-3D-111?style=flat-square&logo=threedotjs&logoColor=C9A227)
![Responsivo](https://img.shields.io/badge/Mobile%20%7C%20Desktop-responsivo-111?style=flat-square&labelColor=111&color=C9A227)

</div>

---

## Sobre o projeto

A PH Company desenvolve **sites, e-commerces e landing pages** com design de impacto e foco em desempenho. Este repositório é o nosso próprio site: a vitrine do nosso trabalho e o primeiro projeto do portfólio.

O objetivo da empresa é simples: **todo negócio, de qualquer tamanho, merece ser encontrado e bem representado online.**

## Destaques

- **Identidade preto e dourado**, pensada para transmitir sofisticação e confiança.
- **Hero em 3D** interativo, com reflexos metálicos, criado com Three.js.
- **Leve e fluido** em Android, iOS e PC, com qualidade do 3D adaptada ao aparelho.
- **Seções completas:** Sobre, Serviços, Portfólio e Contato.
- **Design responsivo**, com alvos de toque confortáveis e sem zoom indesejado no iOS.
- **Acessível:** respeita a preferência de "reduzir movimento" do sistema.

## Desempenho

Fluidez em qualquer aparelho foi requisito desde o início:

| Técnica | Efeito |
| --- | --- |
| Carregamento tardio do 3D | A página fica utilizável antes de a cena 3D chegar |
| Placeholder dourado | Aparece instantaneamente e serve de imagem final em aparelhos sem 3D |
| Versão leve para toque | Menos polígonos, resolução limitada e sem sombras em celulares e tablets |
| Pausa fora da tela | O 3D para de renderizar quando não está visível, poupando bateria |
| Fallback automático | O 3D é dispensado em aparelhos fracos, com economia de dados ou movimento reduzido |
| Divisão de código | A biblioteca 3D fica em arquivo separado e pode ser guardada em cache |
| `content-visibility` | Seções fora da tela só são renderizadas quando necessárias |

## Tecnologias

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Three.js](https://threejs.org/) com [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) e [Drei](https://github.com/pmndrs/drei)
- CSS puro, sem frameworks de estilo

## Como rodar localmente

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# instalar as dependências
npm install

# servidor de desenvolvimento
npm run dev

# gerar a versão de produção (pasta dist/)
npm run build

# visualizar a versão de produção localmente
npm run preview
```

Para testar no celular, conecte-o ao mesmo Wi-Fi e rode `npm run dev -- --host`. Depois abra o endereço de rede exibido no terminal.

## Estrutura

```
ph-company/
├── index.html              # página base e metadados
├── vite.config.js          # configuração do Vite e divisão de código
└── src/
    ├── main.jsx            # ponto de entrada
    ├── App.jsx             # seções e conteúdo do site
    ├── styles.css          # tema preto e dourado
    └── components/
        └── Scene.jsx       # cena 3D do hero
```

## Personalização

- **Textos e seções:** edite `src/App.jsx` (serviços, pilares do "Sobre" e projetos do portfólio).
- **Cores:** altere as variáveis no início de `src/styles.css` (`--gold`, `--bg`, `--ink`, entre outras).
- **Cena 3D:** ajuste formas, materiais e iluminação em `src/components/Scene.jsx`.

## Próximos passos

- [ ] Ligar o formulário de contato a um serviço de envio (e-mail ou WhatsApp)
- [ ] Publicar projetos reais no portfólio
- [ ] Publicar o site em um domínio próprio

## Contato

Quer um site para o seu negócio? Fale com a gente pelo formulário do nosso site.

---

<div align="center">

© PH Company — Pedro &amp; Heitor

</div>
