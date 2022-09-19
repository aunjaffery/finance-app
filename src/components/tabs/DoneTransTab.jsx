import { Box, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchTransactions } from "../../services/Apis";
import TransactionCard from "@comp/cards/TransactionCard";
import NoTransactions from "@comp/placeholders/NoTransactions";
import SkeletonTransaction from "@comp/placeholders/SkeletonTransaction";

const DoneTransTab = () => {
  //1 = lent; 2 = recieved; 3 = borrowed; 4 = repaid;
  const {
    data: transactions,
    isLoading: transLoading,
    isFetching,
  } = useQuery(
    ["fetchTransactions", { status: "done", page: 2 }],
    fetchTransactions,
    {
      refetchOnWindowFocus: false,
      onError: () => toast.error("Error! Cannot fetch transaction"),
    }
  );

  return transLoading ? (
    <Box pb="12">
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="6">
        {[1, 2, 3, 4].map((x) => (
          <SkeletonTransaction key={x} />
        ))}
      </SimpleGrid>
    </Box>
  ) : !transactions?.result.length ? (
    <NoTransactions />
  ) : (
    <Box pb="12">
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="3">
        {transactions?.result.map((d) => (
          <TransactionCard data={d} key={d.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DoneTransTab;