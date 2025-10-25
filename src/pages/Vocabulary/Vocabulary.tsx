import type { Translation } from "@/types";
import { useTranslations, useUpdateTranslation } from "@/hooks";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Tag } from "primereact/tag";
import type { DataTablePageEvent } from "primereact/datatable";
import { VocabularySearch } from "./VocabularySearch";
import { AddTranslationDialog } from "./AddTranslationDialog";
import { EditTranslationDialog } from "./EditTranslationDialog.tsx";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useDeleteTranslation } from "@/hooks";
import "./Vocabulary.style.scss";

export const Vocabulary = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(16);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [selectedTranslation, setSelectedTranslation] =
    useState<Translation | null>(null);
  const updateTranslation = useUpdateTranslation();
  const deleteTranslation = useDeleteTranslation();

  // Calculate page number for API (1-based)
  const page = Math.floor(first / rows) + 1;

  const { data: translations } = useTranslations({
    page,
    limit: rows,
    q: searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFirst(0); // Reset to first page when searching
  };

  const englishBodyTemplate = (rowData: Translation) => {
    return rowData.translations.english;
  };

  const hungarianBodyTemplate = (rowData: Translation) => {
    return rowData.translations.hungarian;
  };

  const handleMemorizedToggle = (rowData: Translation, checked: boolean) => {
    updateTranslation.mutate({
      id: rowData._id,
      translation: { memorized: checked },
    });
  };

  const switchBodyTemplate = (rowData: Translation) => {
    return (
      <InputSwitch
        checked={rowData.memorized || false}
        onChange={(e) => handleMemorizedToggle(rowData, e.value)}
      />
    );
  };

  const editBodyTemplate = (rowData: Translation) => {
    return (
      <Button
        text
        icon={<Edit size={20} />}
        severity="secondary"
        size="small"
        onClick={() => {
          setSelectedTranslation(rowData);
          setEditDialogVisible(true);
        }}
        className="vocabulary-edit-button"
        tooltip="Edit translation"
        tooltipOptions={{ position: "left" }}
      />
    );
  };

  const deleteBodyTemplate = (rowData: Translation) => {
    return (
      <Button
        text
        icon={<Trash2 size={20} />}
        severity="danger"
        size="small"
        onClick={() => {
          setSelectedTranslation(rowData);
          confirmDialog({
            message: `Are you sure you want to delete "${rowData.word}"?`,
            header: "Delete Translation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
              deleteTranslation.mutate(rowData._id);
            },
            reject: () => {
              // Do nothing on reject
            },
          });
        }}
        className="vocabulary-delete-button"
        tooltip="Delete translation"
        tooltipOptions={{ position: "left" }}
      />
    );
  };

  const onPage = (event: DataTablePageEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-start">
        <div className="mb-4">
          <h1 className="text-4xl font-bold m-0 mt-0 mb-2">Vocabulary</h1>
          <p className="text-600 m-0 mb-3">
            Manage your Spanish vocabulary translations
          </p>
          <div className="flex gap-2 align-items-center flex-wrap">
            <VocabularySearch onSearch={handleSearch} />
          </div>
        </div>
        <Button
          label="Add New Word"
          icon={<Plus size={16} />}
          onClick={() => setDialogVisible(true)}
        />
      </div>
      <h3>
        Total memorized:{" "}
        {
          translations?.items?.filter(
            (translation: Translation) => translation.memorized
          ).length
        }
        {" / "} {translations?.items?.length}
      </h3>

      <DataTable
        value={translations?.items}
        paginator
        lazy
        rows={rows}
        first={first}
        totalRecords={translations?.total}
        onPage={onPage}
        emptyMessage="No translations found. Start by adding some Spanish vocabulary to your collection."
        stripedRows
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="word"
          header="Spanish"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="translations.english"
          header="English"
          body={englishBodyTemplate}
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="translations.hungarian"
          header="Hungarian"
          body={hungarianBodyTemplate}
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="memorized"
          header="Memorized"
          body={(rowData: Translation) =>
            rowData.memorized ? (
              <Tag severity="success" value="Yes" />
            ) : (
              <Tag severity="danger" value="No" />
            )
          }
          sortable
          style={{ width: "15%" }}
        />
        <Column
          header="Toggle"
          body={switchBodyTemplate}
          style={{ width: "10%" }}
        />
        <Column
          header="Edit"
          body={editBodyTemplate}
          style={{ width: "10%" }}
        />
        <Column
          header="Delete"
          body={deleteBodyTemplate}
          style={{ width: "10%" }}
        />
      </DataTable>
      <AddTranslationDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
      />
      <EditTranslationDialog
        visible={editDialogVisible}
        onHide={() => {
          setEditDialogVisible(false);
          setSelectedTranslation(null);
        }}
        translation={selectedTranslation}
      />
      <ConfirmDialog />
    </div>
  );
};
