Feature: Listar todas as lojas associadas com informações relacionadas à despesas, lucro e localização
    Como gestor, gostaria de poder ordenar as lojas associadas de acordo com suas principais informações, podendo
    coloca-las em ordem crescente ou decrescente quando relacionadas às suas despesas, lucro e numero de vendas, para que dessa forma
    ter noção de quais lojas estão oferecendo os melhores retornos.

# Service
Scenario: Obter informações das lojas associadas
    Given a loja está registrada com o id "1", nome "Lojão" e Lucro "120"
    When eu pergunto ao sistema pela loja com id "1"
    Then o sistema retorna a loja que está registrada com o id "1", nome "Lojão" e Lucro "120"
# UI
Scenario: listar lojas ordenadas pelo id
    Given eu estou na página "Lojas"
    And a loja está registrada com o id "1", nome "Lojão" e Lucro "120"
    And a loja está registrada com o id "2", nome "Varejão" e Lucro "100"
    And a loja está registrada com o id "3", nome "Atacadão" e Lucro "50"
    And a loja está registrada com o id "4", nome "Descontão" e Lucro "20"
    When eu seleciono "Lucro"
    Then o sistema lista as lojas com nome "Descontão", "Atacadão", "Varejão" e "Lojão", nesta ordem
    When eu seleciono "Lucro" 
    Then o sistema lista as lojas com nome "Lojão", "Varejão", "Atacadão" e "Descontão", nesta ordem