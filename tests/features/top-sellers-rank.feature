Feature: Ordenar em uma lista os melhores vendedores de acordo com o score - valor em vendas/produtos

    Como gestor, gostaria de visualizar, em ordem decrescente, os vendedores que obtiveram o maior quociente de (valor bruto de vendas)/(número de vendas), para saber quais são os melhores vendedores

# Service
Scenario: Validar que o sistema retorna o vendedor corretamente pelo id
    Given o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"
    When eu pergunto ao sistema pelo vendedor com id "1"
    Then o sistema retorna o vendedor que está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"
    # And o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"

# UI
Scenario: Listar vendedores ordenados pelo score
    Given eu estou na página "Vendedor"
    And o vendedor está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00"
    And o vendedor está registrado com o id "2", nome "Gil do Vigor", Número de vendas "2" e Valor bruto de vendas "70000.00"
    And o vendedor está registrado com o id "3", nome "Boninho", Número de vendas "1" e Valor bruto de vendas "10000.00"
    When eu seleciono "Ordenar"
    Then o sistema lista em uma tabela o vendedor com nome "Gil do Vigor", o vendedor com nome "Rafael Portugal" e o vendedor com nome "Boninho", nesta ordem