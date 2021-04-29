Feature: Fazer o download da planilha de vendas da loja

    Como gestor, gostaria de fazer o download da planilha de vendas da minha loja no formato csv

# UI
Scenario: 
    Given eu estou na página de "Vendas"
    When eu clico em "Download"
    Then o sistema baixa o arquivo "TabelaVendas.csv"