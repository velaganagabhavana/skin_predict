'''
SINGLE_MLP_UNITS_1 = 2048
SINGLE_MLP_UNITS_2 = 512
BLOCKS_NUM_HEADS = 32
BLOCKS_KEY_DIM = 16
BLOCKS_VALUE_DIM = 16
INPUT_SHAPE = (32, 32, 3)
PATCH_SIZE = 4
NUM_PATCHES = 64
PROJECTION_DIM = 64
NUM_HEADS = 4
TRANSFORMER_LAYERS = 8
MLP_HEAD_UNITS = [2048, 1024]
NUM_CLASSES = 7

'''

import argparse
parser = argparse.ArgumentParser(description="PARAMS.....\n")
parser.add_argument("--single_mlp_units_1", type=int, default=2048, help="Units for first layer in SINGLE_MLP")
parser.add_argument("--single_mlp_units_2", type=int, default=512, help="Units for second layer in SINGLE_MLP")
parser.add_argument("--blocks_num_heads", type=int, default=32, help="Number of heads in BLOCKS")
parser.add_argument("--blocks_key_dim", type=int, default=16, help="Key dimension in BLOCKS")
parser.add_argument("--blocks_value_dim", type=int, default=16, help="Value dimension in BLOCKS")
parser.add_argument("--input_shape", type=tuple, default=(32, 32, 3), help="Input shape of the model")
parser.add_argument("--patch_size", type=int, default=4, help="Patch size for image splitting")
parser.add_argument("--num_patches", type=int, default=64, help="Number of patches")
parser.add_argument("--projection_dim", type=int, default=64, help="Projection dimension")
parser.add_argument("--num_heads", type=int, default=4, help="Number of attention heads")
parser.add_argument("--transformer_layers", type=int, default=8, help="Number of transformer layers")
parser.add_argument("--mlp_head_units", type=int, nargs='+', default=[2048, 1024], help="MLP head units")
parser.add_argument("--num_classes", type=int, default=7, help="Number of output classes")
print("CHANGING CONFIG_PARAMS....")
args = parser.parse_args()


SINGLE_MLP_UNITS_1 = args.single_mlp_units_1
SINGLE_MLP_UNITS_2 = args.single_mlp_units_2
BLOCKS_NUM_HEADS = args.blocks_num_heads
BLOCKS_KEY_DIM = args.blocks_key_dim
BLOCKS_VALUE_DIM = args.blocks_value_dim
INPUT_SHAPE = args.input_shape
PATCH_SIZE = args.patch_size
NUM_PATCHES = args.num_patches
PROJECTION_DIM = args.projection_dim
NUM_HEADS = args.num_heads
TRANSFORMER_LAYERS = args.transformer_layers
MLP_HEAD_UNITS = args.mlp_head_units
NUM_CLASSES = args.num_classes

