import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:settings_command');

const settings = () => async (ctx: Context) => {
  const message = '*Settings Menu*\nPlease choose an option:';
  
  // Define the keyboard with options
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('VPN', 'vpn_settings'),
    Markup.button.callback('Format', 'format_settings'),
    Markup.button.callback('CC', 'cc_settings')
  ]);

  debug(`Triggered "settings" command with message \n${message}`);
  
  // Send the message with the inline keyboard
  await ctx.replyWithMarkdownV2(message.replace(/_/g, '\\_').replace(/\./g, '\\.'), keyboard);
};

export { settings };
