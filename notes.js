const fs = require('fs');
const chalk = require('chalk');

// Funcion getNotes
const getNotes = () => {
    return 'Your notes...';
}

// Funcion addNote
const addNote = (title, body) => {
    // Recoger notas existentes
    const notes = loadNotes();

    // OPCION 1 : con filter
    // Verificar nombres: no duplicados
    // Almaceno las notas que cumplen el criterio de filter()
    // Criterio: mira si el título que estoy introduciendo = título de cada nota existente -> Por cada note: mira su titulo y lo compara con el que quiero añadir
    // RDO: si es 0 no hay duplicados, cualquier otro número no se permite 
    // const duplicateNotes = notes.filter((note) => note.title === title);
    // if(duplicateNotes.length === 0) {

    // OPCION 2: con find
    // Si hay nota con = title: la almaceno
    // Si no hay duplicados (no he almacenado nada) se ejecuta el código
    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote) {   
       // Añadir nota nueva
        notes.push({
            title: title,
            body: body
        });

        // Almacenar en fichero: las anteriores + la nueva
        saveNotes(notes); 
        console.log(chalk.green.inverse('Nueva nota añadida!'));
    } else {
        console.log(chalk.red.inverse('Error: no se puede duplicar el título de una nota'));
    }

    //console.log(notes);
};

// Funcion removeNote
const removeNote = (title) => {
    // Recoger notas existentes
    const notes = loadNotes();

    // Buscar nota a eliminar: aquí almaceno las que sí === title y filtro (excluyo) la que no
    let eliminado = false;
    const conservarNotas = notes.filter((note) => {
        if(note.title === title) {
            eliminado = true;
        }
        return note.title !== title;
    });

    // Almacenar en fichero: las que quedan
    saveNotes(conservarNotas);

    // Mostrar por consola
    // Otra opcion: if notes.length > conservarNotas.length => si las que había > las que hay he eliminado (verde), si no no (rojo) 
    // Mi versión: usando una variable auxiliar
    if(eliminado) {
        console.log(chalk.green.inverse('Nota eliminada: ' + title));
    } else {
        console.log(chalk.red.inverse('No se ha encontrado la nota!'));
    }
    
}

// Funcion readNote
const readNote = (title) => {   
    // Recoger notas existentes
    const notes = loadNotes();

    // Buscar nota
    const foundNote =  notes.find((note) => note.title === title);

    // Mostrar nota
    if(foundNote) {
        console.log(chalk.magenta.inverse(foundNote.title));
        console.log(foundNote.body);
    } else {
        console.log(chalk.red.inverse('Error: no se ha encontrado la nota'));
    }
}

// Funcion listNotes
const listNotes = () => {
    // Titulo
    console.log(chalk.blue.inverse('Your notes'));

    // Recoger notas existentes
    const notes = loadNotes();

    // Mostrar
    notes.forEach(note => {
        console.log(note.title);
    });
}

// Funcion que carga las notas anteriores
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        console.log('El fichero no existe');
        return [];
    }
}

// Funcion que almacena los datos en fichero
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// Exportar
// Exportamos múltiples variables usando un objeto
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
};