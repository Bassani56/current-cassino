import { supabase } from "../supabaseClient";

export async function setTransacoes(novoValor, type, color) {
    console.log("AQUI ESTA O TYPE ANTES: ", type);

    try {
        const last = await getLastTransaction();
        console.log("LAST: ", last);

        if (!last) {
            console.warn("Nenhuma transação anterior encontrada. Valores iniciais definidos.");
            last = {
                saldo: 0,
                acertos: 0,
                perdas: 0,
                quantidade: 0,
                transacoes: 0,
            };
        }

        const flag = type === "perdeu" || type === "saque";
        console.log('flag: ', flag, type)
        const novoValorAtual = flag
            ? type != 'deposito' && last.saldo - parseFloat(novoValor) // Caso `flag` seja true, subtraia `novoValor`
            : color === "white"
            ? last.saldo + 14 * parseFloat(novoValor) // Se `color` for 'white', adicione 14 vezes `novoValor`
            : last.saldo + parseFloat(novoValor); // Caso contrário, apenas some `novoValor`

    
        console.log("COR APOSTADA: ", color, novoValorAtual);

        const { data_t, error_t } = await supabase
            .from("transacoes")
            .insert([
                {
                    type: type,
                    valor: novoValor,
                },
            ])
            .select();

        if (error_t) {
            console.error("Erro ao inserir na tabela transacoes:", error_t);
        }

        const { data_u, error_u } = await supabase
            .from("usuarios")
            .update({
                saldo: novoValorAtual,
            })
            .eq("id", last.id); // Substitua "id" pelo identificador correto do usuário

        if (error_u) {
            console.error("Erro ao atualizar tabela usuarios:", error_u);
        }

        const lastApostas = await getLastApostas()
        const novaQuantidade = lastApostas.quantidade + 1;

        const { data_a, error_a } = await supabase
            .from("apostas")
            .insert([
                {
                    ganhos: type === "ganhou" ? lastApostas.ganhos + 1 : lastApostas.ganhos,
                    perdas: type === "perdeu" ? lastApostas.perdas + 1 : lastApostas.perdas,
                    valor: type != 'saque' && type != 'deposito' && novoValor,
                    cor: color,
                    quantidade: novaQuantidade,
                    resultado: type 
                },
            ]);

        if (error_a) {
            console.error("Erro ao inserir na tabela apostas:", error_a);
        }

        const { data_dt, error_dt } = await supabase
            .from("database")
            .update({
                num_transacoes: last.transacoes + 1,
            })
            .eq("id", 1); // Atualize com o ID correto, se necessário

        if (error_dt) {
            console.error("Erro ao atualizar tabela database:", error_dt);
        }

        console.log("Dados inseridos e atualizados com sucesso.");

        return {
            transacoes: data_t,
            usuarios: data_u,
            apostas: data_a,
            database: data_dt,
        };
    } catch (error) {
        console.error("Erro ao tentar inserir ou atualizar registros:", error);
        return null;
    }
}

export async function getLastTransaction() {
    try {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .order("id", { ascending: false })
            .limit(1);

        if (error) {
            console.error("Erro ao buscar a última transação:", error);
            return null;
        }

        return data[0] || null;
    } catch (error) {
        console.error("Erro inesperado ao buscar a última transação:", error);
        return null;
    }
}

export async function getLastApostas() {
    try {
        const { data, error } = await supabase
            .from("apostas")
            .select("*")
            .order("id", { ascending: false })
            .limit(1);

        if (error) {
            console.error("Erro ao buscar a última transação:", error);
            return null;
        }

        return data[0] || null;
    } catch (error) {
        console.error("Erro inesperado ao buscar a última transação:", error);
        return null;
    }
}

export async function fetchHistory() {
    try {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*");

        if (error) {
            console.error("Erro ao buscar o histórico de transações:", error);
            return null;
        }

        console.log("Histórico de transações buscado com sucesso:", data);
        return data;
    } catch (error) {
        console.error("Erro inesperado ao buscar o histórico de transações:", error);
        return null;
    }
}

export async function inserirTransacoes() {
    let valorAtual = 5000; // Valor inicial para 'valor_atual'

    for (let i = 0; i < 50; i++) {
        const valor = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        const type = Math.random() > 0.5 ? "ganhou" : "perdeu";

        if (type === "ganhou") {
            valorAtual += valor;
        } else {
            valorAtual -= valor;
        }

        const { error } = await supabase.from("transacoes").insert([
            {
                valor: valor,
                type: type,
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