import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { pricePerItem } from '../constants';

// format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
}

// to be undefined if not inside a provider
const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  // check if not inside a provider
  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetails Provider'
    );
  }

  // if no error, we are wrapped in a provider so return the context
  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  // go through the selected map and sum up all the options the user has chosen
  // return optionType * optionCounts;

  let optionCount = 0;

  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}

// pass along any props happen to get
export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    // Maps are like objects, they have key/value pairs but are a little easier to iterate
    // over for just the values (so will make it easier to find what the subtotals are)
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  // the value is a getter and setter
  // useMemo, prevents the value from being recalculated when doesn't need to be
  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      // get option Map and make a copy
      const { [optionType]: optionMap } = optionCounts;
      const newOptionMap = new Map(optionMap);

      // update the copied Map
      newOptionMap.set(itemName, parseInt(newItemCount));

      // create new object with the old optionCounts plus new map
      const newOptionCounts = { ...optionCounts };
      newOptionCounts[optionType] = newOptionMap;

      // update state
      setOptionCounts(newOptionCounts);
    }

    // getter (value of our internal state here): object containing option counts for scoops and toppings
    // will also contain the subtotals and totals
    // setter, updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  // ...props pass along any props that happen to receive when declare this component
  return <OrderDetails.Provider value={value} {...props} />;
}
