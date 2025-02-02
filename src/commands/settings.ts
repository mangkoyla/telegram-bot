import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:settings_command');

// Main settings command
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

// Handle VPN settings
const handleVpnSettings = () => async (ctx: Context) => {
  const message = '*VPN Settings*\nChoose one to save and return to the main menu:';
  
  // Define the keyboard for VPN options
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Vmess', 'save_vpn_vmess'),
    Markup.button.callback('Vless', 'save_vpn_vless'),
    Markup.button.callback('Trojan', 'save_vpn_trojan'),
    Markup.button.callback('Back to Main Menu', 'back_to_main_menu')
  ]);

  debug(`Triggered "vpn_settings" command with message \n${message}`);
  
  // Edit the message with the new keyboard
  await ctx.editMessageText(message.replace(/_/g, '\\_').replace(/\./g, '\\.'), { ...keyboard, parse_mode: 'MarkdownV2' });
};

// Handle Format settings
const handleFormatSettings = () => async (ctx: Context) => {
  const message = '*Format Settings*\nChoose one to save and return to the main menu:';
  
  // Define the keyboard for Format options
  const keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Clash', 'save_format_clash'),
    Markup.button.callback('Raw', 'save_format_raw'),
    Markup.button.callback('SFA', 'save_format_sfa'),
    Markup.button.callback('Sing-Box', 'save_format_singbox'),
    Markup.button.callback('Back to Main Menu', 'back_to_main_menu')
  ]);

  debug(`Triggered "format_settings" command with message \n${message}`);
  
  // Edit the message with the new keyboard
  await ctx.editMessageText(message.replace(/_/g, '\\_').replace(/\./g, '\\.'), { ...keyboard, parse_mode: 'MarkdownV2' });
};

// Handle CC settings
const handleCcSettings = () => async (ctx: Context) => {
  const message = '*Country Code Settings*\nPlease enter the country code:';
  
  debug(`Triggered "cc_settings" command with message \n${message}`);
  
  // Send the message asking for input
  await ctx.replyWithMarkdownV2(message.replace(/_/g, '\\_').replace(/\./g, '\\.'));
  
  // Wait for user input
  ctx.session.waitForCountryCode = true;
};

// Save country code and return to main menu
const saveCountryCode = () => async (ctx: Context) => {
  if (ctx.session.waitForCountryCode && ctx.message?.text) {
    const countryCode = ctx.message.text;
    ctx.session.countryCode = countryCode;
    ctx.session.waitForCountryCode = false;

    const message = `*Country Code Saved*\nYour country code has been set to: ${countryCode}\nReturning to the main menu...`;
    
    debug(`Saved country code: ${countryCode}`);
    
    // Return to the main menu
    await ctx.replyWithMarkdownV2(message.replace(/_/g, '\\_').replace(/\./g, '\\.'));
    await settings()(ctx);
  }
};

// Back to main menu handler
const backToMainMenu = () => async (ctx: Context) => {
  await settings()(ctx);
};

export { settings, handleVpnSettings, handleFormatSettings, handleCcSettings, saveCountryCode, backToMainMenu };
