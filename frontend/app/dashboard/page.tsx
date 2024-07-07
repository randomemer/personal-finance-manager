"use client";

import ExpenseDialog from "@/components/expense-dialog";
import ExpensesTab from "@/components/expenses-tab";
import { fetcher } from "@/lib/api";
import { TransactionSummary, User } from "@/lib/types";
import {
  AddRounded,
  CallMadeRounded,
  CallReceivedRounded,
  SavingsRounded,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, SpeedDial, SpeedDialAction, Tab, useTheme } from "@mui/material";
import { green, purple, red } from "@mui/material/colors";
import { useState } from "react";
import useSWR from "swr";
import {
  Main,
  SummaryCard,
  SummaryCardTitle,
  SummaryContainer,
  SummaryNumber,
  Welcome,
} from "./styles";

export default function DashboardPage() {
  const { data: user } = useSWR<User>(`/auth/me`, fetcher);
  const theme = useTheme();

  const date = new Date();
  const query = new URLSearchParams({
    month: String(date.getMonth() + 1),
    year: String(date.getFullYear()),
  });

  const { data: totalExpenses } = useSWR<TransactionSummary>(
    () => user && `/expenses/user/${user.id}/total?${query}`,
    fetcher
  );
  const { data: totalIncomes } = useSWR<TransactionSummary>(
    () => user && `/incomes/user/${user.id}/total?${query}`,
    fetcher
  );
  const { data: budgets } = useSWR(
    () => user && `/budgets/user/${user.id}/summary?${query}`,
    fetcher
  );

  const [tab, setTab] = useState("0");
  const [isExpenseDialogOpen, setExpenseDialogOpen] = useState(false);

  return (
    <>
      <Main className="py-20 gap-12">
        <section>
          <Welcome className="mb-12">Hello, {user?.username}</Welcome>

          <SummaryContainer className="gap-4">
            <SummaryCard
              sx={{
                backgroundColor: red[300],
                color: theme.palette.getContrastText(red[300]),
              }}
            >
              <SummaryCardTitle>Expenses</SummaryCardTitle>
              <SummaryNumber>
                {!!totalExpenses ? totalExpenses.amount.toLocaleString() : 0} ₹
              </SummaryNumber>
            </SummaryCard>

            <SummaryCard
              sx={{
                backgroundColor: green[300],
                color: theme.palette.getContrastText(green[300]),
              }}
            >
              <SummaryCardTitle>Incomes</SummaryCardTitle>
              <SummaryNumber>
                {!!totalIncomes ? totalIncomes.amount.toLocaleString() : 0} ₹
              </SummaryNumber>
            </SummaryCard>

            <SummaryCard
              sx={{
                backgroundColor: purple[300],
                color: theme.palette.getContrastText(purple[300]),
              }}
            >
              <SummaryCardTitle>Budgets</SummaryCardTitle>
              <SummaryNumber>{0}</SummaryNumber>
            </SummaryCard>
          </SummaryContainer>
        </section>

        <section>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={(e, val) => setTab(val)}>
                <Tab
                  value="0"
                  label="Expenses"
                  icon={<CallMadeRounded />}
                  iconPosition="start"
                />
                <Tab
                  value="1"
                  label="Incomes"
                  icon={<CallReceivedRounded />}
                  iconPosition="start"
                />
              </TabList>
            </Box>

            <TabPanel value="0">
              <ExpensesTab user={user} />
            </TabPanel>
            <TabPanel value="1"></TabPanel>
          </TabContext>
        </section>

        <SpeedDial
          ariaLabel="App actions"
          color="primary"
          icon={<AddRounded />}
          sx={{ position: "fixed", bottom: 32, right: 32 }}
        >
          <SpeedDialAction
            tooltipTitle="Add Expense"
            icon={<CallMadeRounded color="error" />}
            onClick={() => setExpenseDialogOpen(true)}
          />
          <SpeedDialAction
            icon={<CallReceivedRounded color="success" />}
            tooltipTitle="Add Income"
          />
          <SpeedDialAction
            icon={<SavingsRounded color="primary" />}
            tooltipTitle="Add Budget"
          />
        </SpeedDial>
      </Main>

      <ExpenseDialog
        isOpen={isExpenseDialogOpen}
        isEdit={false}
        onClose={() => setExpenseDialogOpen(false)}
      />
    </>
  );
}

// Hello, <user>

// Expenditure this month (aggreations from API)
// Incomes this month (agg. from API)
// Budgets this month (And how many crossed) (API endpoints)

// Table of transactions (incomes, expenses on seperate tabs)

// Pages in the application :
// - Dashboard : Summary of all expenses, budgets and incomes (+ table of transactions)
// - Should be able to add / edit / delete any type of model from the dashboard using a dialog

// Admin Panel :
// - See list of users (seperate tab)
// - Add / edit / remove categories for expenses (seperate tab)
