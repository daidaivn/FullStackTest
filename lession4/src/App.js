import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './App.css';
import {
  AppProvider,
  Page,
  Form,
  FormLayout,
  TextField,
  Button,
  Select,
  Text,
  Card,
  Divider,
  Grid,
  Icon,
  InlineError,
} from '@shopify/polaris';

import {
  DeleteIcon,
  PlusCircleIcon
} from '@shopify/polaris-icons';

function DiscountForm() {
  const {
    control,
    handleSubmit,
    watch,
    setValue, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaign: '',
      title: '',
      description: '',
      options: [
        {
          id: 1,
          title: 'Single',
          subtitle: '',
          label: '',
          quantity: '1',
          discountType: 'None',
          amount: '',
        },
      ],
    },
  });

  // Đọc mọi giá trị từ form (bao gồm campaign, title, description, v.v.)
  const watchedForm = watch();
  // Riêng mảng options cũng cần watch:
  const watchedOptions = watch('options');

  // Tách riêng một state để add/remove Option
  // Mặc định lấy từ defaultValues
  const [options, setOptions] = useState(watchedForm.options);

  // Hàm submit
  const onSubmit = (data) => {
    if (!data.options || data.options.length === 0) {
      alert('Cần tối thiểu 1 option.');
      return;
    }
  };

  // Thêm option
  const addOption = () => {
    const lastOption = options[options.length - 1];
    const newId = lastOption ? lastOption.id + 1 : 1;
    const newOption = {
      id: newId,
      title: '',
      subtitle: '',
      label: '',
      quantity: '1',
      discountType: 'None',
      amount: '',
    };
    
    const currentOptions = watch('options');
    const newOptionsArray = [...currentOptions, newOption];
    setOptions(newOptionsArray);

    setValue('options', newOptionsArray, { shouldValidate: true, shouldDirty: true });
  };

  // Xoá option
  const removeOption = (id) => {
    const filtered = options.filter((opt) => opt.id !== id);
    setOptions(filtered);

    setValue('options', filtered);
  };

  return (
    <AppProvider>
      <Page fullWidth title="Create volume discount">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            {/* CỘT TRÁI - Form */}
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }} >
              <Card title="General" sectioned>
                <FormLayout>
                  {/* Campaign Name */}
                  <Text variant="headingSm" as="h1">General</Text>
                  <Controller
                    name="campaign"
                    control={control}
                    rules={{ required: 'Campaign Name không được trống' }}
                    render={({ field }) => (
                      <TextField
                        label="Campaign"
                        {...field}
                        error={errors.campaign && errors.campaign.message}
                      />
                    )}
                  />

                  {/* Title */}
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title trong Option không được để trống' }}
                    render={({ field }) => (
                      <TextField
                        label="Title"
                        {...field}
                        error={errors.title && errors.title.message}
                      />
                    )}
                  />

                  {/* Description */}
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Description"
                        multiline
                        {...field}
                      />
                    )}
                  />
                </FormLayout>
              </Card>

              <Divider borderColor="transparent" borderWidth="100" />

              <Card title="Volume discount rule" sectioned>
                <div style={{ marginBottom: '1rem' }}>
                  <Text as="h1" variant="headingSm" style={{ marginBottom: '1rem' }}>
                    Volume discount rule
                  </Text>
                </div>

                {/* InlineError nếu chưa có option */}
                {options.length === 0 && (
                  <InlineError message="Cần tối thiểu 1 option" />
                )}

                {/* Render từng Option */}
                {options.map((option, index) => {
                  // Lấy discountType realtime để ẩn/hiện amount
                  const discountTypePath = `options.${index}.discountType`;
                  const discountTypeValue = watch(discountTypePath, option.discountType);

                  return (
                    <React.Fragment key={option.id}>
                      <Divider borderColor="border-brand" borderWidth="100" style={{ width: '100%' }} />
                      <div style={{ marginBottom: '5rem', position: 'relative' }}>
                        <h1
                          style={{
                            marginBottom: '1rem',
                            backgroundColor: '#FF6600',
                            color: 'white',
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            borderBottomRightRadius: '0.5rem',
                            textAlign: 'left',
                            position: 'absolute',
                            left: 0
                          }}
                        >
                          Option {index + 1}
                        </h1>

                        {/* Nút xoá */}
                        <button
                          onClick={() => removeOption(option.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            position: 'absolute',
                            right: 0,
                            marginTop: '1rem',
                            marginRight: '3rem',
                          }}
                          type="button"
                        >
                          <Icon source={DeleteIcon} />
                        </button>
                      </div>
                      <div style={{ marginBottom: '3rem' }}>
                        <Grid >
                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Title */}
                            <Controller
                              name={`options.${index}.title`}
                              control={control}
                              defaultValue={option.title}
                              rules={{ required: 'Title is required' }}
                              render={({ field }) => (
                                <TextField
                                  label="Title"
                                  {...field}
                                  error={errors.options?.[index]?.title?.message}
                                />
                              )}
                            />
                          </Grid.Cell>

                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Subtitle */}
                            <Controller
                              name={`options.${index}.subtitle`}
                              control={control}
                              defaultValue={option.subtitle}
                              render={({ field }) => (
                                <TextField
                                  label="Subtitle"
                                  {...field}
                                />
                              )}
                            />
                          </Grid.Cell>

                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Label */}
                            <Controller
                              name={`options.${index}.label`}
                              control={control}
                              defaultValue={option.label}
                              render={({ field }) => (
                                <TextField
                                  label="Label (optional)"
                                  {...field}
                                />
                              )}
                            />
                          </Grid.Cell>

                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Quantity */}
                            <Controller
                              name={`options.${index}.quantity`}
                              control={control}
                              defaultValue={option.quantity}
                              rules={{
                                required: 'Quantity is required',
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: 'Must be a number',
                                },
                              }}
                              render={({ field }) => (
                                <TextField
                                  type="number"
                                  label="Quantity"
                                  {...field}
                                  error={errors.options?.[index]?.quantity?.message}
                                />
                              )}
                            />
                          </Grid.Cell>

                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Discount Type */}
                            <Controller
                              name={`options.${index}.discountType`}
                              control={control}
                              defaultValue={option.discountType}
                              render={({ field }) => (
                                <Select
                                  label="Discount Type"
                                  options={[
                                    { label: 'None', value: 'None' },
                                    { label: '% discount', value: '% discount' },
                                    { label: 'Discount / each', value: 'Discount / each' },
                                  ]}
                                  {...field}
                                />
                              )}
                            />
                          </Grid.Cell>

                          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 4 }}>
                            {/* Amount (chỉ hiển thị nếu discountType != None) */}
                            {discountTypeValue !== 'None' && (
                              <Controller
                                name={`options.${index}.amount`}
                                control={control}
                                defaultValue={option.amount}
                                rules={{
                                  required: 'Amount is required',
                                  pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Must be a number',
                                  },
                                }}
                                render={({ field }) => (
                                  <TextField
                                    type="number"
                                    label="Amount"
                                    suffix={
                                      discountTypeValue === '% discount'
                                        ? '%'
                                        : '$'
                                    }
                                    {...field}
                                    error={errors.options?.[index]?.amount?.message}
                                  />
                                )}
                              />
                            )}
                          </Grid.Cell>
                        </Grid>
                      </div>
                    </React.Fragment>
                  );
                })}

                <div style={{ width: '100%', marginTop: '1rem' }}>
                  <button
                    onClick={addOption}
                    style={{
                      width: '100%',
                      backgroundColor: '#FF6600',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    type="button"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="add-option-button" >
                        <Icon source={PlusCircleIcon} tone="primary" />
                      </div>
                      Add Option
                    </div>
                  </button>
                </div>
              </Card>
            </Grid.Cell>

            {/* CỘT PHẢI - Preview */}
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card sectioned>
                <Text as="h1" variant="headingSm">Preview</Text>
                <h1 style={{ marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                  {watchedForm.title}
                </h1>
                <h1 style={{ marginBottom: '1rem' }}>
                  {watchedForm.description}
                </h1>

                {/* Bảng Preview */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Title</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Discount Type</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Quantity</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchedOptions && watchedOptions.length > 0 ? (
                      watchedOptions.map((opt) => {
                        // Logic hiển thị discount
                        let displayDiscount;
                        if (opt.discountType === 'None') {
                          displayDiscount = 'None';
                        } else if (opt.discountType === '% discount') {
                          displayDiscount = `${opt.amount || 0}%`;
                        } else {
                          displayDiscount = `$${opt.amount || 0}/ea`;
                        }
                        return (
                          <tr key={opt.id}>
                            <td style={{ padding: '6px 0' }}>{opt.title || 'N/A'}</td>
                            <td style={{ padding: '6px 0' }}>{opt.discountType}</td>
                            <td style={{ padding: '6px 0' }}>{opt.quantity || '0'}</td>
                            <td style={{ padding: '6px 0' }}>
                              {opt.amount
                                ? opt.discountType === '% discount'
                                  ? `${opt.amount}%`
                                  : opt.discountType === 'Discount / each'
                                    ? `$${opt.amount}`
                                    : '--'
                                : '--'}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4">No options yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </Card>
            </Grid.Cell>
          </Grid>
          {/* Nút Save */}
          <div style={{ marginTop: '1rem' }}>
            <Button submit primary fullWidth>Save</Button>
          </div>
        </Form>
      </Page>
    </AppProvider>
  );
}

export default DiscountForm;
