import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  Namespace,
  NamespaceApiDeleteNamespaceRequest,
} from 'generated-sources';
import EditIcon from 'components/shared/Icons/EditIcon';
import DeleteIcon from 'components/shared/Icons/DeleteIcon';
import ConfirmationDialog from 'components/shared/ConfirmationDialog/ConfirmationDialog';
import { withStyles } from '@mui/styles';
import AppButton from 'components/shared/AppButton/AppButton';
import NamespaceFormContainer from '../NamespaceForm/NamespaceFormContainer';
import { styles, StylesType } from './EditableNamespaceItemStyles';

interface EditableNamespaceItemProps extends StylesType {
  namespace: Namespace;
  deleteNamespace: (
    params: NamespaceApiDeleteNamespaceRequest
  ) => Promise<void>;
}

const EditableNamespaceItem: React.FC<EditableNamespaceItemProps> = ({
  classes,
  namespace,
  deleteNamespace,
}) => {
  const handleDelete = React.useCallback(
    () => deleteNamespace({ namespaceId: namespace.id }),
    [namespace, deleteNamespace]
  );

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <Typography variant="body1" noWrap title={namespace.name}>
          {namespace.name}
        </Typography>
      </Grid>
      <Grid item className={classes.actionsContainer}>
        <NamespaceFormContainer
          namespace={namespace}
          btnEl={
            <AppButton
              size="medium"
              color="primaryLight"
              startIcon={<EditIcon />}
            >
              Edit
            </AppButton>
          }
        />
        <ConfirmationDialog
          actionTitle="Are you sure you want to delete this namespace?"
          actionName="Delete Namespace"
          actionText={
            <>&quot;{namespace.name}&quot; will be deleted permanently.</>
          }
          onConfirm={handleDelete}
          actionBtn={
            <AppButton
              size="medium"
              color="primaryLight"
              startIcon={<DeleteIcon />}
            >
              Delete
            </AppButton>
          }
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(EditableNamespaceItem);