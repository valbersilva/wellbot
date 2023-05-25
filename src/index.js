// importacoes dos modulos e dos arquivos auxiliares
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
// arquivo para registrar os slash comandos ao discord
const { registerCommands } = require('./commands.js');
// arquivo para fazer a importação dos comandos
const { commandHandler } = require('./utils/commandHandler.js');

// variaveis de ambiente
const { DISCORD_TOKEN, GUILD_ID, CLIENT_ID } = process.env;

// cria o cliente que fará a conexão com o discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// usa uma função auxiliar pra adicionar os commandos ao  cliente
client.commands = commandHandler();

// quando a conexão tiver pronta ira executar essa função
client.once('ready', () => {
  console.log('Bot está online!');
  registerCommands(CLIENT_ID, GUILD_ID, DISCORD_TOKEN);
});

// faz login com o token
client.login(DISCORD_TOKEN);

// escuta os eventos enviados pelo discord
client.on(Events.InteractionCreate, async (interaction) => {
  // verifica se a interacao é um slash command
  if (!interaction.isChatInputCommand()) {
    return;
  }

  // procura se exite um comando igual ao que foi solicitado
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error('Comando não encontrado');
    return;
  }

  /*
    blocos try/catch
    o try tenta executar alguma ação
    caso der algum erro durante essa execucao
    é usado os comandos que estao no catch

    async é usado pra fazer funcao assincrona
    funcoes que em alguma parte devem esperar uma resposta chegar para continuar
    quando precisa esperar é usado o await

    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  */

  try {
    // executa o comando com o mesmo nome do comando solicitado no discord
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    // caso der erro manda essa messagem
    await interaction.reply('Houve um erro ao executar esse comando!');
  }
});
