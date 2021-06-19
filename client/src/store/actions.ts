export const ENABLE_EDITING = 'ENABLE_EDITING';
export const DISABLE_EDITING = 'DISABLE_EDITING';
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const enableEditing = () => ({
    type: ENABLE_EDITING,
});
export const disableEditing = () => ({
    type: DISABLE_EDITING,
});
