export const _lang = {
    en: {
        site_title: "Emoji Drawing Tool",
        /* Square */
        square_red: "Square Red",
        square_orange: "Square Orange",
        square_yellow: "Square Yellow",
        square_green: "Square Green",
        square_blue: "Square Blue",
        square_purple: "Square Purple",
        square_brown: "Square Brown",
        square_black: "Square Black",
        square_white: "Square White",
        /*circle*/

        circle_red: "Circle Red",
        circle_orange: "Circle Orange",
        circle_yellow: "Circle Yellow",
        circle_green: "Circle Green",
        circle_blue: "Circle Blue",
        circle_purple: "Circle Purple",
        circle_brown: "Circle Brown",
        circle_black: "Circle Black",
        circle_white: "Circle White",

        /* actions */
        clear_canvas: "Clear",
        size: "Size",
        show: "Show",
        reset: "Reset",
        custom_size: "Custom size",
        copy_clipboard: "Copy to Clipboard",
        copied: "Copied to clipboard!",


        save_button: "Save",
        saved_work: "Saved Work",
        save_warning_advice: "Warning!, all creation are saved <i><b>locally</b></i> in your browser!",
        input_save_name: "Name",
        saved_work_title: "Your creations",
        open_save_button: "Open | Save",
        saved_at: "Saved At",
        empty_list: "Empty list 🌀",
        grid_size_cannot_save: "Canvas max limit: 100",
        grid_saved: "Saved successfully!",
        name_cannot_be_blank: "Name field cannot be blank.",
        editing: "Editing",
    },
    es: {
        site_title: "Dibujo con emojis",
        /* Cuadrado */
        square_red: "Cuadrado Rojo",
        square_orange: "Cuadrado Naranja",
        square_yellow: "Cuadrado Amarillo",
        square_green: "Cuadrado Verde",
        square_blue: "Cuadrado Azul",
        square_purple: "Cuadrado Purpura",
        square_brown: "Cuadrado Marrón",
        square_black: "Cuadrado Negro",
        square_white: "Cuadrado Blanco",

        /*circulo*/
        circle_red: "Círculo Rojo",
        circle_orange: "Círculo Naranja",
        circle_yellow: "Círculo Amarillo",
        circle_green: "Círculo Verde",
        circle_blue: "Círculo Azul",
        circle_purple: "Círculo Purpura",
        circle_brown: "Círculo Marrón",
        circle_black: "Círculo Negro",
        circle_white: "Círculo Blanco",

        /* Acciones */
        clear_canvas: "Limpiar todo",
        size: "Tamaño",
        show: "Mostrar",
        reset: "Borrador",
        custom_size: "Personalizado",
        copy_clipboard: "Copiar todo",
        copied: "Copiado al portapapeles!",

        save_button: "Guardar",
        saved_work: "Guardar",
        save_warning_advice: "Atención!, todas tus creaciones son guardadas <i><b>localmente</b></i> en tu navegador!",
        input_save_name: "Nombre",
        saved_work_title: "Tus creaciones",
        open_save_button: "Abrir | Guardar",
        saved_at: "Guardado: ",
        empty_list: "En un principio, sólo había silencio 🌅",
        grid_size_cannot_save: "El límite de pixel es 100, no se guardará nada.",
        grid_saved: "Guardado con éxito!",
        name_cannot_be_blank: "Por favor, ingresa un nombre.",

        editing: "Editando",
    },
};

export let _ = function (k, l) {
    let exp = _lang[l][k] ?? k;
    return exp;
}