Feature: Editar Meu Perfil
    Como usuário, gostaria de editar no meu perfil, minhas informações de cadastro.

Scenario: Navegação da tela de ‘Meu Perfil’ para ‘Editar Perfil‘
    Given “Marco” é um usuário do tipo “Vendedor”
    And “Marco” está registrado com a “foto de perfil” “user_marco.png”
    And “Marco” está registrado com o “Email”: “marco@cin.com”
    And “Marco” está registrado com o "Nome": “Marco Santana”
    And “Marco” está na tela de "Meu Perfil".
    Then eu consigo visualizar a opção “Editar Perfil”
    When eu clico na opção "Editar Perfil”
    Then eu sou direcionado para a página “Editar Perfil”
    And eu consigo visualizar o campo “foto de perfil” de “Marco” preenchido com “user_marco.png”
    And eu consigo visualizar o campo “Nome” de “Marco” preenchido com "Marco Santana"
    And eu consigo visualizar o campo “Email” de “Marco” preenchido com "marco@cin.com"
    And eu consigo visualizar a opção "Salvar"

Scenario: Editar foto de perfil.
    Given “Marco” é um usuário do tipo “Vendedor”
    And “Marco” está registrado com a “foto de perfil": “user_marco.png”
    And “Marco” está na tela de "Editar Perfil"
    Then eu consigo visualizar o campo “foto de perfil” de “Marco” preenchido com "user_marco.png"
    And eu consigo visualizar a opção "Salvar"
    When eu altero o campo "foto de perfil" para "o arquivo: 'new_photo.png'"
    And eu seleciono a opção "Salvar"
    Then eu sou direcionado para a tela "Meu Perfil"
    And eu consigo visualizar o campo “foto de perfil” de “Marco” preenchido com "new_photo.png"

Scenario: Edição de perfil com email já utilizado.
    Given “Marco” é um usuário do tipo “Vendedor”
    And “Marco” está registrado com o “Email”: “marco@cin.com”
    And "Luiz" é um usuário do tipo "Vendedor"
    And "Luiz" está registrado com o "Email": "tricolor@cin.com"
    And “Marco” está na tela de "Editar Perfil".
    Then eu consigo visualizar o campo “Email” de “Marco” preenchido com "marco@cin.com"
    And eu consigo visualizar a opção "Salvar".
    When eu altero o campo "Email" para "tricolor@cin.com"
    And eu seleciono a opção "Salvar"
    Then o sistema mostra o erro "Email já em uso"

Scenario: Edição de foto de perfil com arquivo sem ser imagem.
    Given “Marco” é um usuário do tipo “Vendedor”
    And “Marco” está registrado com a “foto de perfil": “user_marco.png”
    And “Marco” está na tela de "Editar Perfil"
    Then eu consigo visualizar o campo “foto de perfil” de “Marco” preenchido com "user_marco.png"
    And eu consigo visualizar a opção "Salvar"
    When eu altero o campo "foto de perfil" para "o arquivo: 'livro.pdf'"
    And eu seleciono a opção "Salvar"
    Then o sistema mostra o erro "Somente fotos são aceitas para foto de perfil."