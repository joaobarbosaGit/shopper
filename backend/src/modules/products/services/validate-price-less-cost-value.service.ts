export class ValidadePriceLessCostValueService {

    execute(price: number, cost: number): string{

        if(price < cost){
            return "O novo valor de venda não pode ser menor que o valor de custo"
        }

        return "";
    }
}