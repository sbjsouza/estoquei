Feature: Ordenar em uma lista os melhores vendedores de acordo com o score - valor em vendas/produtos

    Como gestor, gostaria de visualizar, em ordem decrescente, os vendedores que obtiveram o maior quociente de (valor bruto de vendas)/(número de vendas), para saber quais são os melhores vendedores

# Service
Scenario: Obter score do vendedor
    Given o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"
    When eu pergunto ao sistema pelo score do vendedor com id "1"
    Then o sistema retorna "32000"
    And o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"

# UI
Scenario: Existem 3 vendedores ordenados pelo score, em ordem decrescente
    Given eu estou na página "Vendas"
    And o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"
    And o vendedor está registrado com o id "2", nome "Gil do Vigor", Número de vendas "2" e Valor bruto de vendas "70000.00"
    And o vendedor está registrado com o id "3", nome "Boninho", Número de vendas "1" e Valor bruto de vendas "10000.00"
    When eu vou para página "Vendedor"
    Then o sistema lista o vendedor com nome "Gil do Vigor", o vendedor com nome "Rafael Portugal" e o vendedor com nome "Boninho", nesta ordem