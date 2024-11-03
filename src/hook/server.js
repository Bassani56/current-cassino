import { supabase } from "../supabaseClient";

export async function setTransacoes(novoValor, type) {
//   await new Promise(resolve => setTimeout(resolve, 750));

    try {
        let last = await getLastTransaction()
        console.log('LAST: ', last)

        if(last === undefined){
            last.valor_atual = 'teste';
        }

        let flag = false;

        if(type === 'perdeu'){
            flag = true
        }

        console.log('type: ', type)
        console.log('OS TYPE OFS: ', typeof(last.valor_atual), typeof(novoValor))
        const { data, error } = await supabase
            .from('transacoes')
            .insert([
                { valor_atual: flag ? (last.valor_atual - novoValor) : (last.valor_atual + parseInt(novoValor, 10)), type: type, valor: novoValor} // Substitua por outros campos, se necessário
            ]).select();

        if (error) {
            console.error('Erro ao executar a inserção:', error);
            return null;
        } else {
            console.log('Dados inseridos com sucesso:', data);
            return data;
        }
    } catch (error) {
        console.error('Erro ao tentar inserir o registro:', error);
        return null;
    }
}


export async function getLastTransaction() {
    const { data, error } = await supabase
        .from('transacoes')
        .select('*')
        .order('id', { ascending: false }) // ou use o nome da coluna que define a ordem
        .limit(1);

    if (error) {
        console.error('Erro ao buscar a última transação:', error);
        return null;
    }

    return data[0]; // Retorna a última transação
}



export async function fetchHistory() {
    try {
        // Insere um novo registro na tabela 'transacoes'
        const { data, error } = await supabase
            .from('transacoes') 
            .select('*');

        if (error) {
            console.error('Erro ao executar a inserção:', error);
            return null;
        } else {
            console.log('Dados inseridos com sucesso:', data);
            return data;
        }
    } catch (error) {
        console.error('Erro ao tentar inserir o registro:', error);
        return null;
    }
}