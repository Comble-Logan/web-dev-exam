import { Skeleton, Space, Pagination } from "antd";
import {useEffect, useState} from "react";
import { useCustomersProvider } from "../providers/useCustomersProvider";
import { AddCustomerButton } from "./AddCustomerButton";
import { CustomerListItem } from "./CustomerListItem";

export const CustomersList = () => {
  const { customers, deleteCustomer, createCustomer, isLoading, load, totalCount } =
    useCustomersProvider();

  const [currentPage, setCurentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    load(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const PaginationUpdate = (page: number, pageSize: number) => {
    setPageSize(pageSize);
    setCurentPage(page);
  }

  return (
    <Space orientation="vertical" style={{ padding: ".25rem .5rem" }}>
      <AddCustomerButton createCustomer={createCustomer} />
      {isLoading ? (
        <Skeleton/>
      ) : (
        <>{
          customers.map((customer) => (
            <CustomerListItem
              key={customer.id}
              customer={customer}
              deleteCustomer={deleteCustomer}
            />
          ))}

            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange = {PaginationUpdate}
              pageSizeOptions={["10", "15", "20", "25", "30", "35", "40", "45", "50"]}
              showSizeChanger
            />
        </>
          )}
    </Space>
  );
};
