export const columnsView = {
  siteColumns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: (row: any) => row.id,
      sortable: true
    },
    { name: 'name', align: 'center', label: 'Name', field: (row: any) => row.name, sortable: true },
    {
      name: 'address',
      align: 'center',
      label: 'Address',
      field: (row: any) => row.address,
      sortable: true
    },
    {
      name: 'coordinates',
      align: 'center',
      label: 'Coordinates',
      field: (row: any) => row.coordinates,
      sortable: true
    },
    {
      name: 'post_code',
      align: 'center',
      label: 'Post code',
      field: (row: any) => row.post_code,
      sortable: true
    },
    {
      name: 'createdAt',
      align: 'center',
      label: 'Created At',
      field: (row: any) => row.createdAt,
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'Update'
    }
  ],
  customerColumns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: (row: any) => row.id,
      sortable: true
    },
    { name: 'name', align: 'center', label: 'Name', field: (row: any) => row.name, sortable: true },
    {
      name: 'email',
      align: 'center',
      label: 'Email',
      field: (row: any) => row.email,
      sortable: true
    },
    {
      name: 'vat_number',
      align: 'center',
      label: 'Vat number',
      field: (row: any) => row.vat_number,
      sortable: true
    },
    {
      name: 'createdAt',
      align: 'center',
      label: 'Created At',
      field: (row: any) => row.createdAt,
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'Update'
    }
  ],
  meterColumns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: (row: any) => row.id,
      sortable: true
    },
    { name: 'name', align: 'center', label: 'Name', field: (row: any) => row.name, sortable: true },
    {
      name: 'serialNumber',
      align: 'center',
      label: 'SerialNumber',
      field: (row: any) => row.serialNumber,
      sortable: true
    },
    {
      name: 'installationDate',
      align: 'center',
      label: 'Installation date',
      field: (row: any) => row.installationDate,
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'Update'
    }
  ],
  circuitColumns: [
    {
      name: 'id',
      required: true,
      label: 'ID',
      align: 'left',
      field: (row: any) => row.id,
      sortable: true
    },
    { name: 'name', align: 'center', label: 'Name', field: (row: any) => row.name, sortable: true },
    {
      name: 'installationDate',
      align: 'center',
      label: 'Installation date',
      field: (row: any) => row.installationDate,
      sortable: true
    },
    {
      name: 'is_main',
      align: 'center',
      label: 'Main',
      field: (row: any) => row.is_main,
      sortable: true
    },
    {
      name: 'action',
      align: 'center',
      label: 'Update'
    }
  ]
}
