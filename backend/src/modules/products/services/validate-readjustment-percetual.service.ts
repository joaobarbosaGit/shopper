export class ValidadeReadJustmenntPercetualService {

    execute(newPrice: number, price: number): string{

        let diff = newPrice - price;

        if (diff < 0 ){
            diff = diff * -1;
        }
        const percetual = (diff * 100) / price;

        if(percetual >= 10 ){
            return "O valor do reajuste não pode ultrapassar 10%"
        }

        return "";
    }
}