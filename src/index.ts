import type { QRCodeGeneratorState, QrCodeGeneratorMarkerState } from './logic/types'
import { generateQRCode } from './logic/generate'
import { readFileSync } from 'fs'
import * as path from 'path';
import { program } from 'commander'

program
  .option('-t, --input <string>', "Input text to be encoded to qrcode, it will override the text in the config file")
  .requiredOption('-c, --config <string>', "Config to control the style of qr code")
  .option('-o, --output_path <string>', "the output path of result image, defualt value is current directory");

program.parse();

const options = program.opts();

function readState() {

  let state = <QRCodeGeneratorState>{}

  const text = readFileSync(path.resolve(options.config),'utf-8')

  try {
    state = JSON.parse(text)
  }
  catch (e) {
    // eslint-disable-next-line no-alert
    console.log('Invalid JSON file')
  }

  if(options.input !== undefined) state.text = options.input

  return state
}

generateQRCode(readState(), options.output_path !== undefined ? options.output_path : ".")

