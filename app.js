// IMPORTS
// NPM chalk, yargs
const chalk = require('chalk');
const yargs = require('yargs');
// Fichero notes.js
const notes = require('./notes.js');
// Modulo File System
const fs = require('fs');

// ------------- MAIN ----------------
// Personalizar YARGS
yargs.version('1.1.0');     // Llamo con: node .\app.js --version

// Comandos: Add command
yargs.command({
    command:'add',
    describe: 'Añadir nueva nota',
    builder: {
        title: {
            describe: 'Titulo de la nota',
            demandOption: true,      // OBLIGATORIO 
            type: 'string'           // TIPO
        },
        body: {
            describe: 'Cuerpo de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
});
// Comandos: Remove command
yargs.command({
    command:'remove',
    describe: 'Eliminar nota',
    builder: {
        title: {
            describe: 'Titulo de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});
// Comandos: Read command
yargs.command({
    command:'read',
    describe: 'Leer nota',
    builder: {
        title: {
            describe: 'Titulo de la nota',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});
// Comandos: List command
yargs.command({
    command:'list',
    describe: 'Listar notas',
    handler() {
        notes.listNotes();
    }
});

// Parse para que funcione lo anterior
yargs.parse(); 
