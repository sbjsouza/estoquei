Feature: Ordenar em uma lista os melhores vendedores de acordo com o score - valor em vendas/produtos

    Como gestor, gostaria de visualizar, em ordem decrescente, os vendedores que obtiveram o maior quociente de (valor bruto de vendas)/(número de vendas), para saber quais são os melhores vendedores

# Service
Scenario: Não existe vendedor cadastrado na plataforma
    Given eu estou na página "Vendedor"
    When eu solicito ao sistema a "Lista de Vendedores"
    Then o sistema retorna a "Lista de Vendedores" contendo "[]"

Scenario: Existe ao menos um vendedor cadastrado na plataforma
    Given eu estou na página "Vendedor"
    When eu solicito ao sistema a "Lista de Vendedores"
    Then o sistema retorna a "Lista de Vendedores" contendo pelo menos "1" objeto do tipo "Vendedor"

Scenario: Obter score do vendedor
    Given o vendedor de nome "Rafael Portugal" e "id" "1" está cadastrado no sistema com "1" para "Número de vendas" e "32000.00" para "Valor bruto de vendas"
    When eu pergunto ao sistema pelo score do vendedor com "id" "1"
    Then o sistema retorna "32000"
    And o vendedor de nome "Rafael Portugal" e "id" "1" está cadastrado no sistema com "1" para "Número de vendas" e "32000.00" para "Valor bruto de vendas"

# UI
Scenario: Existem 3 vendedores ordenados pelo score, em ordem decrescente
    Given eu estou na página "Vendas"
    And o vendedor está registrado com o "nome" "Rafael Portugal", "Número de vendas" "1" e "Valor bruto de vendas" "32000.00"
    And o vendedor está registrado com o "nome" "Gil do Vigor", "Número de vendas" "2" e "Valor bruto de vendas" "70000.00"
    And o vendedor está registrado com o "nome" "Boninho", "Número de vendas" "1" e "Valor bruto de vendas" "10000.00"
    When eu vou para página "Vendedores"
    Then o sistema lista o vendedor com nome "Gil do Vigor", o vendedor com nome "Rafael Portugal" e o vendedor com nome "Boninho", nesta ordem