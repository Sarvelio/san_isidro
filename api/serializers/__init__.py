from .dynamic_fields_serializer import DFModelSerializer
from .user import UserBaseSerializer, UserReadSerializer, UserSerializer
from .rol import RolReadSerializer, RolSerializer
from .project_types import ProjectTypesBaseSerializer, ProjectTypesReadSerializer, ProjectTypesSaveSerializer
from .project import ProjectReadSerializer, ProjectSerializer
from .city import CityBaseSerializer
from .department import DepartmentBaseSerializer
from .beneficiary import BeneficiaryBaseSerializer, BeneficiaryReadSerializer, BeneficiarySaveSerializer
from .sponsor import SponsorBaseSerializer, SponsorReadSerializer, SponsorSaveSerializer
from .parent import ParentBaseSerializer, ParentReadSerializer, ParentSaveSerializer