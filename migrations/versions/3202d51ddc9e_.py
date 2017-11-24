"""empty message

Revision ID: 3202d51ddc9e
Revises: 80dccab06f2e
Create Date: 2017-11-23 23:41:59.707762

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3202d51ddc9e'
down_revision = '80dccab06f2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('fooddistributioncenters', sa.Column('address', sa.String(length=255), nullable=True))
    op.add_column('fooddistributioncenters', sa.Column('closing_time', sa.Time(), nullable=True))
    op.add_column('fooddistributioncenters', sa.Column('opening_time', sa.Time(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('fooddistributioncenters', 'opening_time')
    op.drop_column('fooddistributioncenters', 'closing_time')
    op.drop_column('fooddistributioncenters', 'address')
    # ### end Alembic commands ###
