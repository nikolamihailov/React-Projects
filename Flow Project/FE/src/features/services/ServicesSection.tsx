import { useTheme } from "@mui/material";
import Section from "../../components/UI/Section/Section";
import SectionInfo from "../../components/Sections/SectionInfo";
import { useServicesQuery } from "../../hooks/services/useServices";
import { serviceSectionStyles } from "../../utils/StylesHelper/Services";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/PaginationAndSelectItems/Pagination";
import ServicesContainer from "./ServicesContainer";
import Spinner from "../../components/Spinner/Spinner";
import SelectItemsPerPage from "../../components/PaginationAndSelectItems/SelectItemsPerPage";

function ServicesSection() {
  const theme = useTheme();
  const { page, itemsPerPage, handleItemsPerPageChange, handlePageChange } = usePagination();

  const { data, isLoading, error } = useServicesQuery(page, itemsPerPage);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading services</div>;
  }

  return (
    <Section bgColor={theme.palette.secondary.dark} style={serviceSectionStyles(theme)}>
      <SectionInfo heading="Explore our services" subheading="services" />

      <SelectItemsPerPage
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        itemName="Services"
      />
      <ServicesContainer services={data?.content} />
      <Pagination totalPages={data?.totalPages || 0} page={page} onPageChange={handlePageChange} />
    </Section>
  );
}

export default ServicesSection;
