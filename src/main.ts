import type { QRCodeGeneratorState, QrCodeGeneratorMarkerState } from './logic/types'
import { generateQRCode } from './logic/generate'
import { readFileSync } from 'fs'
import * as path from 'path';

function readState() {

  let state = <QRCodeGeneratorState>{}

  const text = readFileSync(path.resolve('./config.json'),'utf-8')

  try {
    state = JSON.parse(text)
  }
  catch (e) {
    // eslint-disable-next-line no-alert
    console.log('Invalid JSON file')
  }

  return state
}

generateQRCode(readState())

