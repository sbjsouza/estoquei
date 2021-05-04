Feature: Listar todas as lojas associadas com informações relacionadas à despesas, lucro e localização
    Como gestor, gostaria de poder ordenar as lojas associadas de acordo com suas principais informações, podendo
    coloca-las em ordem crescente ou decrescente quando relacionadas às suas despesas, lucro e numero de vendas, para que dessa forma
    ter noção de quais lojas estão oferecendo os melhores retornos.

# Service
Scenario: Obter informações das lojas associadas
    Given a loja está registrada com o id "1", nome "Lojão", Valor de vendas "400.00", Despesas "300.00", Lucro "100.00", 
    Logo "varejao.png" e Localização "https://www.google.com.br/maps/place/Varej%C3%A3o+do+Povo/@-8.0862002,-34.9304656,13z/data=!4m9!1m2!2m1!1svarejao!3m5!1s0x7ab192bda710d69:0x3a46c0c062ec7c72!8m2!3d-8.0683125!4d-34.9099961!15sCgd2YXJlamFvWhIKB3ZhcmVqYW8iB3ZhcmVqYW-SAQ1ncm9jZXJ5X3N0b3Jl"
    When eu pergunto ao sistema pela loja com id "1"
    Then o sistema retorna a loja que está registrada com o id "1", nome "Lojão", Valor de vendas "400.00", Despesas "300.00", Lucro "100.00", 
    Logo "varejao.png" e Localização "https://www.google.com.br/maps/place/Varej%C3%A3o+do+Povo/@-8.0862002,-34.9304656,13z/data=!4m9!1m2!2m1!1svarejao!3m5!1s0x7ab192bda710d69:0x3a46c0c062ec7c72!8m2!3d-8.0683125!4d-34.9099961!15sCgd2YXJlamFvWhIKB3ZhcmVqYW8iB3ZhcmVqYW-SAQ1ncm9jZXJ5X3N0b3Jl"
    

# UI
Scenario: listar lojas ordenadas pelo id
    Given eu estou na página "Lojas"
    And a loja está registrada com o id "1", nome "Lojão", Valor de vendas "400.00", Despesas "280.00", Lucro "120.00", 
    Logo "lojao.png" e Localização "https://www.google.com.br/maps/place/LOJ%C3%83O/@-8.0862018,-34.9042008,15z/data=!3m1!5s0x7ab1f3b239d5b27:0x90fcc192be140cdd!4m9!1m2!2m1!1sLojao!3m5!1s0x7ab1f3bec5d8d93:0x22fce176caea7700!8m2!3d-8.0862018!4d-34.8954461!15sCgVMb2phb1oOCgVsb2phbyIFbG9qYW-SAQ9jb3NtZXRpY3Nfc3RvcmU"
    And a loja está registrado com o id "2", nome "Varejão", Valor de vendas "500.00", Despesas "400.00", Lucro "100.00", 
    Logo "varejao.png" e Localização "https://www.google.com.br/maps/place/Varej%C3%A3o+do+Povo/@-8.0862002,-34.9304656,13z/data=!4m9!1m2!2m1!1svarejao!3m5!1s0x7ab192bda710d69:0x3a46c0c062ec7c72!8m2!3d-8.0683125!4d-34.9099961!15sCgd2YXJlamFvWhIKB3ZhcmVqYW8iB3ZhcmVqYW-SAQ1ncm9jZXJ5X3N0b3Jl"
    And a loja está registrado com o id "3", nome "Atacadão", Valor de vendas "400.00", Despesas "350.00", Lucro "50.00", 
    Logo "atacadao.png" e Localização "https://www.google.com.br/maps/place/Atacad%C3%A3o/@-8.0861972,-34.9304656,13z/data=!4m9!1m2!2m1!1satacadao!3m5!1s0x7ab1983960839c3:0x92a437c50ef0791b!8m2!3d-8.0297192!4d-34.9440174!15sCghhdGFjYWRhbyIDiAEBkgEKd2hvbGVzYWxlcg"
    And a loja está registrado com o id "4", nome "Descontão", Valor de vendas "170.00", Despesas "150.00", Lucro "20.00", 
    Logo "descontao.png" e Localização "https://www.google.com.br/maps/place/DESKONT%C3%83O+CEASA/@-8.0788791,-34.9396361,15z/data=!4m5!3m4!1s0x7ab1ea967a1e323:0xfaa7039bbdd6d6c0!8m2!3d-8.0742155!4d-34.9458909"
    When eu seleciono "Lucro"
    Then o sistema lista as lojas com nome "Descontão", "Atacadão", "Varejão" e "Lojão", nesta ordem
    When eu seleciono novamente "Lucro" 
    Then o sistema lista as lojas com nome "Lojão", "Varejão", "Atacadão" e "Descontão", nesta ordem