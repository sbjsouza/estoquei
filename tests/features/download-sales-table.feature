Feature: Fazer o download da planilha de vendas da loja

    Como gestor, gostaria de fazer o download da planilha de vendas da minha loja no formato csv

# Service
Scenario: Obter valor de venda de um determinado produto
    Given uma venda cadastrada no sistema do produto "Cadeira" que tem id "2"
    When eu pergunto ao sistema sobre o total ganho na venda de id "2"
    Then o sistema retorna o total de "160"

# UI
Scenario: 
    Given eu estou na página de "Vendas"
    When eu clico em "Download"
    Then o sistema baixa o arquivo "TabelaVendas.csv"