import { Box, Button, Typography, useTheme } from "@mui/material";
import ServicesContainerAdmin from "./ServicesContainerAdmin";
import { usePagination } from "../../../hooks/usePagination";
import { useServicesQuery } from "../../../hooks/services/useServices";
import Spinner from "../../../components/Spinner/Spinner";
import Section from "../../../components/UI/Section/Section";
import {
  selectItemsAndBtnSx,
  serviceItemAdminBtnSx,
  serviceSectionStyles,
} from "../../../utils/StylesHelper/Services";
import SectionInfo from "../../../components/Sections/SectionInfo";
import SelectItemsPerPage from "../../../components/PaginationAndSelectItems/SelectItemsPerPage";
import Pagination from "../../../components/PaginationAndSelectItems/Pagination";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Modal from "../../../components/UI/Modal/Modal";
import AddForm from "./forms/AddForm";

function ServicesSectionAdmin() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const { page, itemsPerPage, handleItemsPerPageChange, handlePageChange } = usePagination();

  const { data, isLoading, error, refetch } = useServicesQuery(page, itemsPerPage);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Typography>Error loading services</Typography>;
  }

  return (
    <Section bgColor={theme.palette.secondary.dark} style={serviceSectionStyles(theme)}>
      <SectionInfo heading="Services" subheading="Admin Panel" />

      <Box sx={selectItemsAndBtnSx}>
        <Button sx={serviceItemAdminBtnSx(theme)} onClick={() => setIsOpen(true)}>
          <AddIcon /> Add Service
        </Button>
        <SelectItemsPerPage
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemName="Services"
        />
      </Box>

      <ServicesContainerAdmin services={data?.content} refetchServices={refetch} />

      <Pagination totalPages={data?.totalPages || 0} page={page} onPageChange={handlePageChange} />
      <Modal open={isOpen} handleClose={() => setIsOpen(false)} title="Add Service">
        <AddForm handleClose={() => setIsOpen(false)} refetchServices={refetch} />
      </Modal>
    </Section>
  );
}

export default ServicesSectionAdmin;
