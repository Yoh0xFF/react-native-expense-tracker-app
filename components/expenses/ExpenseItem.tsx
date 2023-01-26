import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import { Expense } from '../../types/expenses';
import { formatDate } from '../../util/date';

interface Props {
  expense: Expense;
}

export default function ExpenseItem({ expense }: Props) {
  const { desc, date, amount } = expense;
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.desc]}>{desc}</Text>
          <Text style={styles.textBase}>{formatDate(date)}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  desc: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
