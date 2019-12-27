<template>
  <v-container grid-list-lg>
    <v-layout >
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-card>
          <v-card-title primary-title>Pagamento</v-card-title>
          <v-card-text>
            Efetue o pagamento se o fizer por transferência ou qualquer forma que haja comprovantes, localize seu nome na lista de participantes, na coluna ações clique para anexar os comprovantes.
            Pode ser feito por dinheiro também, se tiver difícil a localização do seu nome no smartfone gire a tela do celular para a lista ser montada como tabela.
            É possível ordenar também por nome na lista, ou seleciona todos na quantidade de exibição no rodapé.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm12 md4 lg4>
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>NuBank</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Agência</v-list-item-title>
                  <v-list-item-subtitle>
                    <span>Agencia:</span> 0001
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Nu Pagamentos S.A.(260)</v-list-item-title>
                  <v-list-item-subtitle>
                    <span>Conta:</span> 1585424-1
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <span>CPF:</span> 049.404.965-03
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>Jeferson Jesus Menezes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md4 lg4>
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Bradesco</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Agência</v-list-item-title>
                  <v-list-item-subtitle>1195</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Conta Poupança</v-list-item-title>
                  <v-list-item-subtitle>1031607-3</v-list-item-subtitle>
                  <v-list-item-subtitle>Jeferson Jesus Menezes</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 sm12 md4 lg4>
        <v-card>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Outros</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title>Não é possível trasferir nessas contas</v-list-item-title>
                  <v-list-item-subtitle>se não conseguir pagar ou trasferir para essas contas</v-list-item-subtitle>
                  <v-list-item-subtitle>me avise que veremos outra forma</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
