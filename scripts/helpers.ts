import chalk from 'chalk';
import terminalLink from 'terminal-link';

export function logHeader(message: string) {
    console.log(
        chalk.green.bold(`
  ${'#'.repeat(message.length + 8)}
  ##  ${message}  ##
  ${'#'.repeat(message.length + 8)}
  
  `)
    );
}

export function logStep(message?: string) {
    console.log(
        `  ${message}`
    );
}

export function y(message?: string) {
    return chalk.yellowBright(message)
}

export function l(message: string, link: string) {
    return terminalLink(message, link)
}
