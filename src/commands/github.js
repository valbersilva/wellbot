const axios = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  // option é para que seja possivel enviar variavel pela messagem
  data: new SlashCommandBuilder()
    .setName('github')
    .setDescription('Obtém informações de um usuário do GitHub.')
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription('Nome de usuário do GitHub')
        .setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.options.getString('username');
    const response = await getGithubUser(username);
    interaction.reply(response);
  },
};

// funcao que cchama api do github
async function getGithubUser(username) {
  try {
    // assincrono pq ele solicita e espera o github enviar a resposta
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const user = response.data;
    // para enviar embeds nao pode envar apenas uma string por isso retorna esse objeto
    return { embeds: [createGithubEmbed(user)] };
  } catch (error) {
    console.error(error);
    return 'Não foi possível obter as informações do usuário do GitHub.';
  }
}

// funcção para criar embed
function createGithubEmbed(githubUser) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(githubUser.name)
    .setURL(githubUser.html_url)
    .setDescription(githubUser.bio)
    .setThumbnail(githubUser.avatar_url)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Seguidores',
        value: githubUser.followers.toString(),
        inline: true,
      },
      {
        name: 'Seguindo',
        value: githubUser.following.toString(),
        inline: true,
      },
      {
        name: 'Numero de repositorios publicos',
        value: githubUser.public_repos.toString(),
      },
      {
        name: 'Localidade',
        value: githubUser.location?.toString() || 'não informado',
      }
    )
    .setTimestamp()
    .setFooter({
      text: 'thank you for use',
    });

  return embed;
}
