import {CategoryProps} from "./CategoryProps";
import {TransactionTypeProps} from "./TransactionTypeProps";

export interface TransactionCardProps{
    type: TransactionTypeProps
    title: string;
    amount: string;
    category: CategoryProps;
    date: string;
}
