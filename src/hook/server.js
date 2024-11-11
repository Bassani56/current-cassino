import { supabase } from "../supabaseClient";

export async function setTransacoes(novoValor, type) {
//   await new Promise(resolve => setTimeout(resolve, 750));
    console.log('AQUI ESTA O TYPE ANTES: ', type)
    try {
        let last = await getLastTransaction()
        console.log('LAST: ', last)

        if(last === undefined){
            last.valor_atual = 'teste';
        }

        let flag = false;

        if(type === 'perdeu' || type === 'saque'){
            flag = true
        }

        console.log('type: ', type)
        console.log('OS TYPE OFS: ', typeof(last.valor_atual), typeof(novoValor))
        console.log('atual: ', last.valor_atual, 'aposta: ', novoValor)
        const { data, error } = await supabase
            .from('transacoes')
            .insert([
                {
                    valor_atual: flag ? (last.valor_atual - novoValor) : (last.valor_atual + parseFloat(novoValor)),
                    type: type,
                    valor: novoValor,
                    acertos: type === 'ganhou' ? last.acertos + 1 : last.acertos, // Incrementa acertos apenas se for 'ganhou'
                    perdas: type === 'perdeu' ? last.perdas + 1 : last.perdas // Decrementa perdas apenas se for 'perdeu'
                }
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
            console.log('Dados buscados com sucesso:', data);
            return data;
        }
    } catch (error) {
        console.error('Erro ao tentar inserir o registro:', error);
        return null;
    }
}

export async function inserirTransacoes() {
    let valorAtual = 5000; // Valor inicial para 'valor_atual'
  
    for (let i = 0; i < 50; i++) {
      // Gerando um valor aleatório entre 100 e 1000
      const valor = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  
      // Definindo o tipo da transação (ganhou ou perdeu)
      const type = Math.random() > 0.5 ? 'ganhou' : 'perdeu';
  
      // Atualizando o valor atual com base no tipo
      if (type === 'ganhou') {
        valorAtual += valor;
      } else {
        valorAtual -= valor;
      }
  
      // Inserindo a transação no Supabase
      const { error } = await supabase.from('transacoes').insert([
        {
          valor: valor,
          type: type,
          valor_atual: valorAtual,
        },
      ]);
  
      if (error) {
        console.error("Erro ao inserir transação:", error.message);
      } else {
        console.log(`Transação ${i + 1} inserida com sucesso.`);
      }
    }
  
    console.log("Inserção de 50 transações concluída.");
  }