Feature: Exportar Planilha de Estoque
    Como gestor, desejo exportar a planilha de estoque para o meu computador para análise de como a empresa está performando

Scenario: Adicionar um produto ao estoque
    Given "Sergio" está definido na base de dados como "Administrador"
    And "Sergio" está na "Página de Gerenciamento de Estoque"
    When eu seleciono “exportar para excel” e seleciono “estoque do produto 1”
    Then o download do arquivo “estoque_produto1.xlsx” é iniciado
