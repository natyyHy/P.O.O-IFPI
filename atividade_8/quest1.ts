/* 1 - Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com
códigos seus ou pesquisados na internet.*/

// 1 - Exceção com Try-Catch
//try realizar a operaçao,se houver error, a exceção é lançada, catch captura a exceção e exibe mensagem de erro
function validarDividir(a: number, b: number): void {
    try {
        if (b === 0) {
            throw new Error('Divisor foi inserido com valor 0...');
        }

        if(a < 0){
            throw new Error('Dividendo foi inserido com numero negativo...')
        }
    } catch (e : unknown) {
        if(e instanceof Error){
            console.log(`Error ocorrido na operação: ${e.message}`);
        }
    }
}

validarDividir(10, 0);


validarDividir(-10, 2);


// 2 - Exceção com Throw
//lançar um erro manualmente,quando queremos lançar um erro quando uma condição específica não é atendida.
function validarNumeroPositivo(a : number) : number {
    if(a < 0){
        throw new Error('Numero nao é positivo...');
    }
    return a;
}

function validarNumeroNegativo(a : number) : number {
    if(a > 0){
        throw new Error('Numero não é negativo...')
    }
    return a;
}

try {

    validarNumeroPositivo(-10);
    console.log('este codico nao executa')

} catch(e : unknown){
    if(e instanceof Error){
        console.log('Error ao ler numero: ' + e.message)
    }
}


// 3 - Exceção com finally
// bloco finally sera executado independente se ocorrer exceções ou não
function validarCaminhoArquivo(a : string) : void {
    try {
        if(a === ""){
            throw new Error('Caminho do arquivo vazio')
        }

    }catch(e : unknown){
        if(e instanceof Error){
            console.log(`error ao ler arquivo: ${e.message}`)
        }
    }finally{
        console.log('operaçao de validacao do caminho do arquivo completa....');
    }
}

validarCaminhoArquivo('anotacao.txt'); // sem ocorrer exceçoes
validarCaminhoArquivo(''); //deve ocorrer exceçoes