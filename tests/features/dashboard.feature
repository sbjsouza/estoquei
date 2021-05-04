Feature: Página de dashboard para B.I. Tabelas com até três produtos rankeados por: Produtos mais vendidos, Produtos com maior faturamento(valor x vendas)

    Como gestor, gostaria de visualizar o dashboard de produtos, com informações importantes para a minha decisão de escolhas no estoque. Sendo elas: Produtos mais vendidos, Produtos maior faturamento

# UI

Scenario: Existe mais de três vendas cadastradas na plataforma para mais de três produtos diferentes
    Given eu estou na página "Vendas"
    And existe o produto "Cadeira" cadastrado com id "2" no valor de "40" reais com "4" vendas
    And existe o produto "Mesa" cadastrado com id "3" no valor de "100" reais com "2" vendas
    And existe o produto "Banquinho" cadastrado com id "4" no valor de "25" reais com "3" vendas
    And existe o produto "Vaso de Centro" cadastrado com id "5" no valor de "20" reais com "1" vendas
    When eu vou para página "dashboard" com o título "Dashboard de Produtos"
    Then a tabela "top-sales" contem respectivamente: "Cadeira", "Banquinho", "Mesa"
    And a tabela "top-revenue" contem respectivamente: "Mesa", "Cadeira", "Banquinho"

# Service

Scenario: Existe mais de três vendas cadastradas na plataforma para mais de três produtos diferentes
    Given existe o produto "Cadeira" cadastrado com id "2" no valor de "40" reais com "4" vendas
    And existe o produto "Mesa" cadastrado com id "3" no valor de "100" reais com "2" vendas
    And existe o produto "Banquinho" cadastrado com id "4" no valor de "25" reais com "3" vendas
    And existe o produto "Vaso de Centro" cadastrado com id "5" no valor de "20" reais com "1" vendas
    When eu solicito ao servidor o "dashboard"
    Then o sistema retorna o dashboard contendo três itens na lista de "top_sales" e três itens na lista de "top_revenues"
    And a lista de "top_sales" contem respectivamente: "Cadeira" de id "2" com "4" "vendas", "Banquinho" de id "4" com "3" "vendas", "Mesa" de id "3" com "2" "vendas"
    And a lista de "top_revenues" contem respectivamente: "Mesa" de id "3" com "200" "reais de faturamento", "Cadeira" de id "2" com "160" "reais de faturamento", "Banquinho" de id "4" com "75" "reais de faturamento"
