Feature: Meu Perfil
    Como vendedor, gostaria de visualizar no meu perfil, minhas informações de cadastro e
    as minhas métricas de desempenho: metas de venda e avaliações.

Scenario: Visualização e navegação do menu 'Meu Perfil'
    Given "Marco" é um usuário do tipo "Vendedor"
    And "Marco" está registrado com a "foto de perfil" "user_marco.png"
    And "Marco" está registrado com o "Email": "marco@cin.com"
    And "Marco" está registrado com o "Nome": "Marco Santana"
    And "Marco" está em qualquer página do sistema depois do login.
    Then eu consigo visualizar no menu a opção "Meu Perfil"
    When eu seleciono a opção "Meu Perfil"
    Then eu sou direcionado para a página "Meu Perfil"
    And eu consigo visualizar a "foto de perfil" de "Marco", "user_marco.png"
    And eu consigo visualizar a opção "Editar Perfil"
    And eu consigo visualizar o "Nome" de "Marco", "Marco Santana"
    And eu consigo visualizar o "Email" de "Marco", "marco@cin.com"

Scenario: Visualização da minha lista de métricas na página 'Meu Perfil'
    Given "Marco" é um usuário do tipo "Vendedor"
    And "Marco" possui a métrica "Vender 4 produtos"
    And "Marco" já vendeu "2" produtos no mês atual
    And "Marco" está na página "Meu Perfil".
    When eu seleciono a opção "Métricas"
    Then o sistema mostra a lista de métricas de "Marco" na mesma página
    And o sistema mostra na lista de métricas a métrica "Vender 4 produtos" com "50%" concluida.

Scenario: Visualização da minha lista de avaliações na página 'Meu Perfil'
    Given "Marco" é um usuário do tipo "Vendedor"
    And "Marco" possui uma avaliação do gerente "Luiz" com o corpo "Sabe negociar, precisa focar no financeiro"
    And "Marco" está na página "Meu Perfil".
    When eu seleciono a opção "Avaliações"
    Then o sistema mostra a lista de avaliações de "Marco" na mesma página
    And eu consigo ver na lista de avaliações,  a avaliação do gerente "Luiz" com o corpo "Sabe negociar, precisa focar no financeiro"

Scenario: Navegar para página de edição das minhas informações pessoais
    Given "Marco" é um usuário do tipo "Vendedor"
    And "Marco" está registrado com "a foto de perfil" "user_marco.png"
    And "Marco" está registrado com "o email" "marco@gmail.com"
    And "Marco" está na página "Meu Perfil".
    Then eu consigo visualizar no menu a opção "Editar Perfil"
    When eu seleciono a opção "Editar Perfil"
    Then eu sou redirecionado para uma página com o form de edição de perfil
    And eu consigo ver o campo "foto de perfil" preenchido com "a foto user_marco.png"
    And eu consigo ver o campo "email" preenchido com "marco@gmail.com"
    And eu consigo ver a opção "Confirmar"
