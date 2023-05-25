const { SlashCommandBuilder } = require('@discordjs/builders');

/*
cada comando deve ser um objeto com esse esqueleto
{
  data: <uma instancia de class slashCommandBuilder>
  execute: <funcao a ser usada para responder>
}

module.exports é para exportar o que tem apos o =

no js se eu quero criar um objeto e passar uma variavel como atributo
se eu colocar so a variavel ele atribui o nome da variavel como a propriedade
e o valor como atributo

const valor = 10
console.log({ valor })

{
  valor: 10
}

é isso que faço quando passo a função execute, o async não interfere nisso
*/

module.exports = {
  // set name diz qual o nome do comando
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com pong!'),
  async execute(interaction) {
    // reply é usado para responder, e é assincrono pq faz interação com o discord
    await interaction.reply('pong!');
  },
};
