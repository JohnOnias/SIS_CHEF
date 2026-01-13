Olá Pessoal :D


## pré - requisitos
- Node (ultima versão)
- Git
- DB browser sqlite(bom instalar que facilita vossa vida)
- fé em Deus pra entender essa sopa 


## instalação
- git clone [url]
- cd para raiz do projeto
- cd front e instale o react via npm (npm init )
- cd back instale o electron via npm (npm install electron)
- cd back, cd database, instale o sequelize para rodar as migrations(
    npm install --save-dev sequelize
    npm install --save-dev sequelize-cli
    npx sequelize-cli init
)
- rode as migrations (
    npx sequelize-cli db:migrate
)

## provavelmente faltou algo ou errei algo,  qualquer coisa se vira ai my friendo :D 


## CONTINUAÇÃO

                               
                               ## -   FRONT  - ##

-descrição do q entendo do projeto

- o front(react) se comunica com o back(electron) via preeloads(as pontes)
para pegar dados do back crie uma "ponte" no front que o reponsalvel pelo back cria o resto

- o front usa react-dom-router(algo assim o nome) porem como vai ser rodado no electron utiliza # nas url's, fique atento a isso

- projeto front foi dividido em pastas(de preferencia a ingles) que são as seguintes ate o momento:
  -- routers, reponsavel pelas rotas 
  -- views, responsavel pelos componentes
  -- assets, responsavel por imagens sons etc 
  
dentro de views vai ter subtopicos:
    -- adm, todas as views relacionadas a adm
    -- bartender, todas as views relacionadas a bartender(garçom)
    -- components, componentes repetidos comuns a algumas views, dentro da mesma tem modais e layouts
    -- login,  todas as views relacionadas a login
    -- managerm,  todas as views relacionadas a manager(gerente)
    -- order,  todas as views relacionadas a order(pedido)

mais explicaçoes em breve...



                                     ## -   BACK  - ##

o back(electron) recebe requisiçoes do front(react) via pontes preloads e ipc, os preeloads criam as pontes(ipc) e os ipc's chamam ações do back(node)

o electron renderiza as telas via função nativa BrowserWindow, mas aqui vai ser chamada de Screen, normalmente se cria telas para cada aba aberta, porem foi criado um arquivo generico que renderiza as telas "CreateBrowserWindow", porem caso seja modal de tamanhos especificos ou telas de tamanho especifico tem que criar um novo arquivo de renderização


- o projeto back foi dividido em pastas(de preferencia a ingles) que são as seguintes ate o momento:

    -- database, responsavel pelo banco de dados, migrations, models relacionados ao banco, raiz do sequelize(recomendo apreender o basico)

    -- ipc, responsavel pelas pontes que ligam o back com o front
    -- preloads, reponsavel para criar a coneção do front com o back criando uma "api" onde a mesma vaai ter acesso aos 
    ipcs de forma segura(n tente acessar ipcs diretamente sem usar preload)
    
    -- screens, responsavel pela renderização na tela, subdividida em pastas deacordo com o exigido
    -- models, responsavel pela interação com o banco de dados, subdividido em pastas deacordo com oq cada exigencia da aplicação, "utils" são intações comuns a algumas requisiçoes

    -- main é onde é importado tudo, onde acontece realmente o processamento do back 

mais explicações e correções em breve...

                        