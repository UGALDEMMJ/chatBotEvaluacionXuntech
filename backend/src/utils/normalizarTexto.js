export default function normalizarTexto(texto) {
    if (!texto || typeof texto !== 'string') {
        return '';
    }
    
    return texto
        .toLowerCase()                   
        .trim()                          
        .replace(/[¿?¡!.,;:]/g, '')      
        .replace(/\s+/g, '')             
        .normalize('NFD')                
        .replace(/[\u0300-\u036f]/g, '') 
        .replace(/[^a-z0-9]/g, '');      
}